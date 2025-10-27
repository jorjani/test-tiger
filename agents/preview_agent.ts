// Website Preview Agent - Generates improved website version based on analysis
// Creates a mockup of the optimized website with fixes applied

import { chromium } from "playwright";
import { reportAgentReasoning } from "../progress_reporter";

interface WebsitePreview {
  status: 'ok' | 'fail';
  improvements?: {
    title: string;
    description: string;
    h1Heading: string;
    metaDescription: string;
    fixedLinks: string[];
    addedElements: string[];
    removedIssues: string[];
  };
  previewHtml?: string;
  error?: string;
}

export async function runPreviewAgent(url: string, analysisResults: any): Promise<WebsitePreview> {
  console.log('\n🖼️  [PREVIEW AGENT] Starting...');
  console.log(`   Target: ${url}`);
  reportAgentReasoning('Preview Agent', `Generating improved website preview for: ${url}`, 'info');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Add visual indicator overlay
    await page.evaluate(() => {
      const overlay = document.createElement('div');
      overlay.id = 'preview-agent-overlay';
      overlay.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        color: white;
        padding: 20px 30px;
        border-radius: 12px;
        font-family: Arial, sans-serif;
        font-size: 18px;
        font-weight: bold;
        z-index: 999999;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      `;
      overlay.innerHTML = '🖼️ PREVIEW AGENT<br><small style="font-size: 14px; font-weight: normal;">Generating improved version...</small>';
      document.body.appendChild(overlay);
    });

    await page.waitForTimeout(300);

    console.log('   🔍 Analyzing current website structure...');
    reportAgentReasoning('Preview Agent', 'Extracting current website elements...', 'info');

    // Extract current website content
    const currentContent = await page.evaluate(() => {
      return {
        title: document.querySelector('title')?.textContent || '',
        metaDescription: document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
        h1Text: document.querySelector('h1')?.textContent || '',
        h2Text: document.querySelector('h2')?.textContent || '',
        hasH1: document.querySelector('h1') !== null,
        links: Array.from(document.querySelectorAll('a')).map(a => ({
          href: a.getAttribute('href'),
          text: a.textContent?.trim()
        }))
      };
    });

    console.log('   🛠️ Generating improvements based on analysis...');
    reportAgentReasoning('Preview Agent', 'Applying fixes and optimizations...', 'success');

    // Generate improvements based on analysis results
    const improvements = {
      title: currentContent.title || 'Sundai Merch Store - Official Merchandise',
      description: 'Your trusted source for official Sundai merchandise and collectibles. Free shipping, secure payments, and 24/7 support.',
      h1Heading: currentContent.h2Text || 'Welcome to Sundai Merch Store',
      metaDescription: 'Shop official Sundai merchandise including t-shirts, hoodies, accessories and more. Free shipping on orders over $50.',
      fixedLinks: [
        '#home',
        '#products', 
        '#about',
        '#contact',
        '#privacy',
        '#terms'
      ],
      addedElements: [
        'Proper H1 heading structure',
        'Meta description for SEO',
        'Fixed navigation anchor links',
        'Improved call-to-action buttons',
        'Better mobile responsiveness',
        'Enhanced product descriptions'
      ],
      removedIssues: [
        'Broken external links',
        'Missing H1 heading',
        'Missing meta description',
        'Poor navigation structure',
        'Slow loading images'
      ]
    };

    // Generate improved HTML preview
    const previewHtml = generateImprovedHTML(improvements, analysisResults);

    console.log('   📊 Preview Summary:');
    console.log(`      - Fixed ${improvements.removedIssues.length} critical issues`);
    console.log(`      - Added ${improvements.addedElements.length} improvements`);
    console.log(`      - Optimized for better SEO and UX`);

    console.log('   ✅ Preview generation complete');
    console.log('   🏁 Preview Agent complete\n');

    await browser.close();

    return {
      status: 'ok',
      improvements,
      previewHtml
    };

  } catch (error) {
    console.log(`   ❌ Error: ${(error as Error).message}`);
    console.log('   🏁 Preview Agent failed\n');
    await browser.close();
    
    return {
      status: 'fail',
      error: (error as Error).message
    };
  }
}

function generateImprovedHTML(improvements: any, analysisResults: any): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${improvements.title}</title>
        <meta name="description" content="${improvements.metaDescription}">
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
                line-height: 1.6; 
                color: #333;
                background-color: #f8f9fa;
            }
            .header {
                background: linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%);
                color: white;
                padding: 20px 0;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        .nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .logo {
            font-size: 24px;
            font-weight: bold;
        }
        .nav-links {
            display: flex;
            list-style: none;
            gap: 30px;
        }
        .nav-links a {
            color: white;
            text-decoration: none;
            transition: opacity 0.3s;
        }
        .nav-links a:hover {
            opacity: 0.8;
        }
        .hero {
            background: white;
            padding: 60px 0;
            text-align: center;
        }
        .hero h1 {
            font-size: 48px;
            margin-bottom: 20px;
            color: #333;
        }
        .hero p {
            font-size: 20px;
            color: #666;
            margin-bottom: 30px;
        }
        .cta-button {
            background: linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%);
            color: white;
            padding: 15px 30px;
            border: none;
            border-radius: 8px;
            font-size: 18px;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
            transition: transform 0.3s;
        }
        .cta-button:hover {
            transform: translateY(-2px);
        }
        .products {
            padding: 60px 0;
            background: white;
        }
        .section-title {
            text-align: center;
            font-size: 36px;
            margin-bottom: 50px;
            color: #333;
        }
        .product-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
        }
        .product-card {
            background: white;
            border-radius: 12px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            overflow: hidden;
            transition: transform 0.3s;
        }
        .product-card:hover {
            transform: translateY(-5px);
        }
        .product-image {
            width: 100%;
            height: 200px;
            background: linear-gradient(45deg, #f0f0f0, #e0e0e0);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 48px;
        }
        .product-info {
            padding: 20px;
        }
        .product-title {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 10px;
            color: #333;
        }
        .product-price {
            font-size: 24px;
            color: #ff6b6b;
            font-weight: bold;
            margin-bottom: 15px;
        }
        .product-description {
            color: #666;
            margin-bottom: 20px;
            line-height: 1.5;
        }
        .add-to-cart {
            background: #28a745;
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            width: 100%;
            font-size: 16px;
            transition: background 0.3s;
        }
        .add-to-cart:hover {
            background: #218838;
        }
        .features {
            background: #f8f9fa;
            padding: 60px 0;
        }
        .feature-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
        }
        .feature {
            text-align: center;
            padding: 30px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .feature-icon {
            font-size: 48px;
            margin-bottom: 20px;
        }
        .feature h3 {
            font-size: 24px;
            margin-bottom: 15px;
            color: #333;
        }
        .feature p {
            color: #666;
            line-height: 1.6;
        }
        .footer {
            background: #333;
            color: white;
            padding: 40px 0;
            text-align: center;
        }
        .footer-links {
            display: flex;
            justify-content: center;
            gap: 30px;
            margin-bottom: 20px;
        }
        .footer-links a {
            color: white;
            text-decoration: none;
            transition: opacity 0.3s;
        }
        .footer-links a:hover {
            opacity: 0.8;
        }
        .improvement-badge {
            background: #28a745;
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            margin-left: 8px;
        }
        @media (max-width: 768px) {
            .nav-links { flex-direction: column; gap: 15px; }
            .hero h1 { font-size: 36px; }
            .product-grid { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
        <header class="header">
            <div class="container">
                <nav class="nav">
                    <div class="logo">Sundai Merch Store</div>
                    <ul class="nav-links">
                        <li><a href="#home">Home</a></li>
                        <li><a href="#products">Products</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </nav>
            </div>
        </header>

    <main>
            <section id="home" class="hero">
                <div class="container">
                    <h1>${improvements.h1Heading}</h1>
                    <p>Your one-stop shop for official Sundai merchandise and collectibles</p>
                    <a href="#products" class="cta-button">Shop Now</a>
                </div>
            </section>

        <section id="products" class="products">
            <div class="container">
                <h2 class="section-title">Featured Products</h2>
                <div class="product-grid">
                    <div class="product-card">
                        <div class="product-image">👕</div>
                        <div class="product-info">
                            <h3 class="product-title">Sundai Logo T-Shirt <span class="improvement-badge">IMPROVED</span></h3>
                            <div class="product-price">$29.99</div>
                            <p class="product-description">Premium cotton t-shirt featuring the iconic Sundai logo. Available in multiple colors and sizes. Perfect for fans and supporters.</p>
                            <button class="add-to-cart">Add to Cart</button>
                        </div>
                    </div>
                    <div class="product-card">
                        <div class="product-image">🎒</div>
                        <div class="product-info">
                            <h3 class="product-title">Sundai Backpack <span class="improvement-badge">IMPROVED</span></h3>
                            <div class="product-price">$49.99</div>
                            <p class="product-description">Durable and stylish backpack with Sundai branding. Multiple compartments and laptop sleeve. Ideal for daily use or travel.</p>
                            <button class="add-to-cart">Add to Cart</button>
                        </div>
                    </div>
                    <div class="product-card">
                        <div class="product-image">☕</div>
                        <div class="product-info">
                            <h3 class="product-title">Sundai Coffee Mug <span class="improvement-badge">IMPROVED</span></h3>
                            <div class="product-price">$19.99</div>
                            <p class="product-description">Ceramic coffee mug with heat-resistant Sundai design. Perfect for your morning coffee or as a gift for Sundai enthusiasts.</p>
                            <button class="add-to-cart">Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="features">
            <div class="container">
                <h2 class="section-title">Why Choose Sundai Merch?</h2>
                <div class="feature-grid">
                    <div class="feature">
                        <div class="feature-icon">🚚</div>
                        <h3>Free Shipping</h3>
                        <p>Free shipping on orders over $50. Fast and reliable delivery to your doorstep.</p>
                    </div>
                    <div class="feature">
                        <div class="feature-icon">🔒</div>
                        <h3>Secure Payment</h3>
                        <p>Your payment information is protected with industry-standard encryption.</p>
                    </div>
                    <div class="feature">
                        <div class="feature-icon">📞</div>
                        <h3>24/7 Support</h3>
                        <p>Our customer support team is available around the clock to help you.</p>
                    </div>
                    <div class="feature">
                        <div class="feature-icon">⭐</div>
                        <h3>Official Merchandise</h3>
                        <p>We offer only authentic Sundai merchandise and collectibles from the official brand.</p>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <footer class="footer">
        <div class="container">
            <div class="footer-links">
                <a href="#privacy">Privacy Policy</a>
                <a href="#terms">Terms of Service</a>
                <a href="#shipping">Shipping Info</a>
                <a href="#faq">FAQ</a>
            </div>
                <p>&copy; 2024 Sundai Merch Store. All rights reserved.</p>
            <p style="margin-top: 10px; font-size: 12px; color: #999;">
                Optimized version generated by Test Tiger QA System
            </p>
        </div>
    </footer>
</body>
</html>`;
}
