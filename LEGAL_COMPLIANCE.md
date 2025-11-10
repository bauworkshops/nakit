# Legal Compliance Implementation

This document outlines the legal compliance features implemented for the jewelry catalogue website to meet EU and Serbian regulations.

## ✅ Implemented Features

### 1. Legal Pages
- **Privacy Policy** (`/privacy-policy`) - Explains data handling (no cookies, no tracking)
- **Terms of Use** (`/terms-of-use`) - Catalogue usage terms, intellectual property rights
- **Legal Information** (`/legal-info`) - Company registration details and business info

### 2. Footer Component
- Added to all pages with links to legal information
- Responsive design for mobile and desktop
- Multi-language support (English, Russian, Serbian)

### 3. Product Safety Information Schema
Added fields to products for EU GPSR compliance:
- `material_composition` - Material details (gold, silver, gemstones, etc.)
- `material_composition_rus` - Russian translation
- `material_composition_srb` - Serbian translation
- `safety_info` - Safety warnings/allergen info (nickel content, choking hazards, etc.)
- `safety_info_rus` - Russian translation
- `safety_info_srb` - Serbian translation

### 4. Multi-Language Support
All legal content available in:
- English (eng)
- Russian (rus)
- Serbian (srb)

## ⚙️ Required Configuration

### Step 1: Import Updated Schema
Import the updated schema to Pocketbase:
1. Open Pocketbase Admin (`http://127.0.0.1:8090/_/`)
2. Go to Settings → Import collections
3. Select `/backend/pb_schema.json`
4. Click "Import"

### Step 2: Add Company Legal Information
Add these keys to the `registry` collection in Pocketbase:

| Key | Description | Example |
|-----|-------------|---------|
| `legal_company_name` | Full legal business name | "Bau Designs DOO" |
| `legal_reg_number` | Registration number (Matični broj) | "12345678" |
| `legal_tax_id` | Tax ID (PIB) | "987654321" |
| `legal_address` | Business address | "Kneza Miloša 10, 11000 Belgrade, Serbia" |
| `contact_phone` | Business phone | "+381 11 123 4567" |
| `contact_email` | Business email | "info@baudesigns.rs" |

**How to add:**
1. Go to Pocketbase Admin → Collections → registry
2. Click "New record" for each entry
3. Add key-value pairs as shown above

### Step 3: Add Product Material & Safety Information
For each product in the catalogue, optionally add:

**Material Composition Examples:**
- "925 Sterling Silver, Cubic Zirconia"
- "18K Gold Plated Brass"
- "Natural Pearl, Stainless Steel"

**Safety Info Examples:**
- "Contains nickel. May cause allergic reactions in sensitive individuals."
- "Small parts. Choking hazard for children under 3 years."
- "Hypoallergenic - nickel-free"

Add these in the product edit form in Pocketbase admin panel.

## 📋 Legal Compliance Checklist

### ✅ GDPR Compliance (Catalogue-Only)
- [x] Privacy Policy stating no data collection
- [x] No cookies used
- [x] No user tracking
- [x] Google Maps notice (third-party service)

### ✅ Serbian E-Commerce Law
- [x] Company registration info displayed
- [x] Contact information provided
- [x] Clear statement that this is a catalogue (not e-commerce)
- [x] Product information with descriptions

### ✅ EU General Product Safety Regulation (GPSR)
- [x] Product material composition fields
- [x] Safety information fields
- [x] Multi-language product information
- [ ] **TODO:** Designate EU Responsible Person (if selling to EU)

### ⚠️ Still Required (If Selling to EU)
If you plan to sell products to EU customers:
1. **Designate EU Responsible Person** - Required for non-EU businesses
2. Add their contact details to Legal Info page
3. Ensure all products have material composition filled in
4. Add safety warnings where applicable

## 🌐 Pages Reference

| Page | URL | Purpose |
|------|-----|---------|
| Legal Info | `/legal-info` | Business registration & contact |
| Privacy Policy | `/privacy-policy` | Data handling statement |
| Terms of Use | `/terms-of-use` | Catalogue usage terms |
| Contacts | `/contacts` | Contact information & map |

## 📝 Notes

### Not Required (Catalogue-Only Site)
- ❌ Cookie consent banner (no cookies used)
- ❌ Return/Refund policy (not e-commerce)
- ❌ Payment processing info (not e-commerce)
- ❌ Shopping cart terms (not e-commerce)
- ❌ Data processing agreements (no user data)

### Material Information Best Practices
For jewelry products, include:
- **Metals:** Type (gold, silver, brass), purity (18K, 925), plating
- **Gemstones:** Natural/synthetic, type, origin (if known)
- **Allergen info:** Nickel content, hypoallergenic materials
- **Age warnings:** Small parts for children under 3

### Example Product Info
```
Title: Silver Pearl Necklace
Material: 925 Sterling Silver, Natural Freshwater Pearl
Safety: Contains small parts. Not suitable for children under 3 years old.
```

## 🔄 Updating Legal Information

To update company information:
1. Edit values in `registry` collection
2. Changes reflect immediately on website
3. No code changes needed

To update legal page content:
1. Edit files in `/frontend/src/app/[page]/page.tsx`
2. Update `LAST_UPDATED` constant
3. Rebuild and redeploy

## 📞 Support

For questions about legal compliance:
- Consult with a lawyer specializing in e-commerce law
- Contact Serbian Business Registers Agency for registration questions
- Review EU GPSR guidelines: https://ec.europa.eu/safety-gate

---

**Last Updated:** November 10, 2025

