/**
 * CV PDF Generation Server
 * ========================
 *
 * Uses Puppeteer (headless Chromium) to generate PDF from HTML templates.
 * Supports Arabic/Hebrew with proper RTL layout and font rendering.
 *
 * Templates implement strict page break rules:
 * - page-break-inside: avoid on sections and items
 * - page-break-after: avoid on headings
 * - orphans/widows control
 * - Content NEVER overflows page boundaries
 */

const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Load Cairo font as base64 for embedding (better Arabic support)
const fontPath = path.join(__dirname, 'fonts', 'Cairo-Variable.ttf');
let cairoFontBase64 = '';
try {
  if (fs.existsSync(fontPath)) {
    cairoFontBase64 = fs.readFileSync(fontPath).toString('base64');
    console.log('Cairo font loaded successfully');
  }
} catch (err) {
  console.warn('Cairo font not found locally, will use Google Fonts CDN');
}

// CV Template generators
const templates = {
  elegant: require('./templates/elegant'),
  bold: require('./templates/bold'),
  classic: require('./templates/classic'),
  ats: require('./templates/ats'),
  executive: require('./templates/executive'),
  minimal: require('./templates/minimal'),
  tech: require('./templates/tech'),
  luxe: require('./templates/luxe'),
  azure: require('./templates/azure'),
  noir: require('./templates/noir'),
  coral: require('./templates/coral')
};

// Generate PDF endpoint
app.post('/api/generate-pdf', async (req, res) => {
  const { cvData, templateStyle = 'elegant', language = 'en', sections = [] } = req.body;

  if (!cvData) {
    return res.status(400).json({ error: 'CV data is required' });
  }

  const isRTL = ['ar', 'he'].includes(language);

  // Default sections if none provided
  const includedSections = sections.length > 0 ? sections : [
    'summary', 'experience', 'education', 'skills', 'certifications', 'projects', 'achievements'
  ];

  let browser;
  try {
    console.log(`Generating PDF: template=${templateStyle}, language=${language}, RTL=${isRTL}`);

    // Launch Puppeteer with settings optimized for Arabic text
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--font-render-hinting=none',
        '--disable-gpu'
      ]
    });

    const page = await browser.newPage();

    // Set viewport for A4 dimensions (210mm x 297mm at 96 DPI)
    await page.setViewport({
      width: 794,  // 210mm at 96 DPI
      height: 1123, // 297mm at 96 DPI
      deviceScaleFactor: 2
    });

    // Get template HTML
    const templateGenerator = templates[templateStyle] || templates.elegant;
    const htmlContent = templateGenerator.generateHTML(
      cvData,
      includedSections,
      language,
      isRTL,
      cairoFontBase64
    );

    // Set content and wait for everything to load
    await page.setContent(htmlContent, {
      waitUntil: ['domcontentloaded', 'networkidle0']
    });

    // Wait for fonts to fully load
    await page.evaluate(() => {
      return document.fonts.ready;
    });

    // Additional wait to ensure Arabic shaping is complete
    await new Promise(resolve => setTimeout(resolve, 500));

    // Generate PDF with proper A4 settings
    // Note: margin is set to 0 because templates handle their own padding
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0',
        right: '0',
        bottom: '0',
        left: '0'
      },
      preferCSSPageSize: true
    });

    await browser.close();

    // Send PDF with proper headers
    const fileName = `${cvData.personalInfo?.fullName || 'CV'}_${templateStyle}.pdf`;
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(fileName)}"`);
    res.setHeader('Content-Length', pdfBuffer.length);
    res.send(pdfBuffer);

    console.log(`PDF generated successfully: ${fileName}`);

  } catch (error) {
    console.error('PDF generation error:', error);
    if (browser) {
      try {
        await browser.close();
      } catch (e) {
        // Ignore close errors
      }
    }
    res.status(500).json({
      error: 'Failed to generate PDF',
      details: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'PDF Server is running',
    templates: Object.keys(templates),
    fontLoaded: !!cairoFontBase64
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
===========================================
  CV PDF Server running on port ${PORT}
===========================================

  Templates available:
  - elegant   (gradient header, purple-rose)
  - bold      (teal sidebar, refined elegance)
  - classic   (single-column, professional)
  - ats       (plain, ATS-compatible)
  - executive (luxury, navy/gold premium)
  - minimal   (swiss design, whitespace)
  - tech      (developer-focused, terminal)
  - luxe      (gold & black, luxury premium)
  - azure     (blue gradient, professional)
  - noir      (dark sophisticated, silver)
  - coral     (warm elegant, soft tones)

  Endpoints:
  - POST /api/generate-pdf
  - GET  /api/health

===========================================
  `);
});
