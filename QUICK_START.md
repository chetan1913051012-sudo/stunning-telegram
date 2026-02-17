# 🚀 Quick Start Guide - Homelike Spices

## For Business Owners (Non-Technical)

### Getting Your Store Online in 3 Steps:

#### Step 1: Get the Code Running (5 minutes)
1. Download and install [Node.js](https://nodejs.org)
2. Open Terminal/Command Prompt
3. Navigate to this folder
4. Type: `npm install` and press Enter
5. Type: `npm run dev` and press Enter
6. Open browser to `http://localhost:5173`

#### Step 2: Customize Your Store (15 minutes)
1. **Login to Admin Panel**:
   - Click "Admin" button in navigation
   - Password: `admin123`
   
2. **Add Your Products**:
   - Click "Products" tab
   - Click "Add Product"
   - Fill in:
     - Product name (e.g., "Premium Turmeric Powder")
     - Price in rupees (e.g., 299)
     - Image URL (upload to [imgur.com](https://imgur.com) and copy link)
     - Description
     - Weight (e.g., 100g)
   - Click "Add Product"

3. **Update Settings**:
   - Click "Settings" tab
   - Update admin email (orders will come here)
   - Update store name if needed

#### Step 3: Deploy Online (10 minutes)

**Easiest Way - Netlify Drop:**
1. Type `npm run build` in Terminal
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
3. Drag the `dist` folder to the page
4. Done! Copy your website URL
5. Share with customers!

---

## 📱 How to Use the Store

### For Customers:
1. **Browse Products**: Click "Shop" in navigation
2. **Add to Cart**: Click "Add to Cart" on any product
3. **Checkout**: Click cart icon, then "Proceed to Checkout"
4. **Fill Details**: Name, email, phone, address
5. **Choose Payment**: Cash on Delivery, UPI, or Card
6. **Place Order**: Click "Place Order"
7. **Track Order**: Click "My Orders" and search with email/phone

### For Admin (You):
1. **Login**: Click "Admin" (password: `admin123`)
2. **View Orders**: See all customer orders
3. **Update Status**: Click status buttons (Pending → Processing → Shipped → Delivered)
4. **Manage Products**: Add, edit, or delete products
5. **Settings**: Update email and store info

---

## 💡 Important Information

### Admin Password
- **Current**: `admin123`
- **Change it**: In `src/App.tsx`, find `password === 'admin123'` and change it

### Product Images
- Use image hosting services:
  - [Imgur](https://imgur.com) - Free, easy
  - [Cloudinary](https://cloudinary.com) - Professional
  - [ImgBB](https://imgbb.com) - Simple
- Upload image → Copy direct link → Paste in product form

### Orders
- Orders are sent to your admin email
- Customers can track orders on "My Orders" page
- You update status in admin panel

### Data Storage
- All data saved in browser (localStorage)
- **Important**: Data is local to each browser
- For real database, see README.md → Database Setup

---

## 🎯 Daily Operations

### Morning Routine:
1. Open admin panel
2. Check new orders
3. Update order status
4. Respond to customer emails

### Adding New Products:
1. Take product photos
2. Upload to Imgur
3. Add product in admin panel
4. Set price and stock status

### Managing Orders:
1. New order arrives → Status: Pending
2. Start packing → Status: Processing
3. Handed to courier → Status: Shipped
4. Customer receives → Status: Delivered

---

## 📧 Email Setup (Optional but Recommended)

### To receive order emails:

1. **Sign up at EmailJS**:
   - Go to [emailjs.com](https://www.emailjs.com)
   - Create free account

2. **Add Email Service**:
   - Connect your Gmail/Outlook
   - Note the Service ID

3. **Create Template**:
   - Create order notification template
   - Note the Template ID

4. **Get Public Key**:
   - Account settings → Copy public key

5. **Update Code**:
   - See README.md for code changes
   - Or hire a developer (1-hour job)

---

## 🌐 Sharing Your Store

### Get More Customers:

1. **Social Media**:
   - Add link to Instagram bio
   - Post on Facebook
   - Share on WhatsApp Status

2. **Google My Business**:
   - Add your website URL
   - Get more local visibility

3. **QR Code**:
   - Create at [qr-code-generator.com](https://www.qr-code-generator.com)
   - Print on packaging

4. **Word of Mouth**:
   - Share link with friends
   - Ask customers to share

---

## ❓ Common Questions

**Q: How do I change the website colors?**
A: Hire a developer or learn basic CSS (easy to learn)

**Q: Can customers pay online?**
A: Currently shows payment options. For real payment integration, use Razorpay/PayTM (needs developer)

**Q: How do I get a custom domain (like homelikespices.com)?**
A: 
1. Buy domain from GoDaddy/Namecheap (~₹800/year)
2. Connect to Netlify (instructions in DEPLOYMENT_GUIDE.md)

**Q: Is the data safe?**
A: Data is in browser localStorage. For better security, use Firebase (see README.md)

**Q: Can I have multiple admins?**
A: Currently single admin. Can be extended by a developer.

**Q: How do I backup my data?**
A: Open browser console (F12), type:
```javascript
console.log(localStorage.getItem('homelike_products'))
console.log(localStorage.getItem('homelike_orders'))
```
Copy the output and save to text file.

---

## 🆘 Need Help?

### Website Not Opening:
- Check if Node.js is installed
- Run `npm install` again
- Try different browser

### Can't Add Products:
- Make sure you're logged in as admin
- Use valid image URLs
- Fill all required fields

### Orders Not Showing:
- Check "Orders" tab in admin panel
- Customers must fill valid email to search

### Site Slow:
- Check internet connection
- Optimize images (use smaller file sizes)
- Consider upgrading hosting

---

## 📞 Getting Professional Help

### When to Hire a Developer:

- Setting up email notifications
- Adding payment gateway
- Custom features
- Database integration
- Mobile app version

### Where to Find Developers:
- Upwork
- Fiverr
- Local IT services
- Freelancer.com

**Expected Cost**: ₹5,000 - ₹25,000 for customizations

---

## 🎉 Success Tips

1. **Start Simple**: Don't over-complicate initially
2. **Quality Photos**: Good product photos = more sales
3. **Quick Response**: Reply to orders within 24 hours
4. **Honest Pricing**: Competitive and fair pricing
5. **Customer Service**: Happy customers = repeat business
6. **Regular Updates**: Add new products monthly
7. **Promotions**: Run occasional discounts
8. **Reviews**: Ask happy customers for testimonials

---

## 📊 Track Your Success

### Weekly:
- Count total orders
- Note best-selling products
- Check customer feedback

### Monthly:
- Calculate revenue
- Identify trends
- Plan new products

### Quarterly:
- Review and update website
- Analyze growth
- Set new goals

---

## 🌟 Growing Your Business

### Phase 1 (Month 1-3):
- Get website live
- Add 10-15 products
- Get first 50 customers
- Learn the system

### Phase 2 (Month 4-6):
- Add 20+ products
- Start marketing
- Improve based on feedback
- Add payment gateway

### Phase 3 (Month 7-12):
- Expand product range
- Hire help if needed
- Consider mobile app
- Scale operations

---

**Remember**: Every big business started small. Focus on quality products and good customer service. The website is just a tool to help you grow! 🌶️

**Good luck with Homelike Spices!** 🚀
