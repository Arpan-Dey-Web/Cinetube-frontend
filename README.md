**Movie and Series Rating & Streaming Portal Assignment Requirements**

**Project Overview**

Develop a **Movie and Series Rating Portal** where users can explore, rate, and review movies and TV series. Admins manage the media library (movies/series entries) and moderate user-generated content. Users can rate titles on a 1-10 scale, write reviews, stream and engage with others through comments and likes. The portal will prioritize performance, security, and an intuitive user experience, built using modern full-stack technologies.

* * *

### **Functional Requirements**

### **1\. User Roles**

**User:**

*   Register and log in using email/password or social login.
*   Browse movies/series by genre, streaming platform, release year, or rating.
*   Rate (1-10 stars) and review movies/series.
*   Add spoiler warnings or tags (e.g., "family-friendly") to reviews.
*   Like/unlike reviews and comment on them .
*   Purchase/Rent:
    *   Buy (one-time purchase) or rent (time-limited access) movies/series.
    *   View purchase history and streaming links.
*   Save titles to a personal watchlist.
*   Edit/delete their own reviews (if unpublished).

**Admin:**

*   Manage movies/series in the media library (title, description, genre, release year, director, cast, streaming platform).
*   Approve or unpublish user reviews/comments.
*   View aggregated ratings and reports (e.g., most-reviewed titles).
*   Remove inappropriate content.
*   View sales/rental analytics.
*   Handle refunds/access revocation (optional).

### **2\. Core Features**

**Authentication:**

*   Secure JWT-based authentication with password hashing.
*   Password reset functionality.

**Media Library Management (Admin-Only):**

*   Admins populate and maintain a database of movies/series.
*   Each entry includes: title, synopsis, genre(s), release year, director, cast, and streaming platform(s).
*   Pricing ("premium","free").
*   Streaming link youtube.

**Review System:**

*   Users select a movie/series from the library to review.
*   Submit reviews with:
    *   Rating (1-10 stars).
    *   Written review.
    *   Tags (e.g., "classic," "underrated") and spoiler toggle.
*   Reviews require admin approval before publication.
*   Users can edit/delete unpublished reviews.

**Payment System:**

*   Integration with Stripe/PayPal/Razorpay or any other.
*   Purchase Flow:
    1. User selects "monthly subscription".
    2. Enters payment details (card/mfs wallet).
    3. Receives confirmation email (optional: send email).
       
**Interaction Features:**

*   Like/unlike reviews (one like per user per review).
*   Comment on reviews and reply to comments (nested threads optional).
*   Watchlist: Users save titles to a personal list.

**Search and Filter:**

*   Search by title, genre, director, cast, or streaming platform.
*   Filter by release year, rating range, or popularity.
*   Sort by highest-rated, most-reviewed, or latest releases.

**Dashboard & Analytics (Admin-Only):**

*   View pending reviews, published content, and user activity.
*   See aggregated stats (e.g., average rating per title).

**Responsive Design:**

*   Optimized for all devices (mobile, tablet, desktop).

#### **3\. Pages**

**Home Page:**

*   Displays featured movies/series (highest-rated, trending, or admin-selected).
*   Search bar with filters (genre, streaming platform, release year).
*   Quick-access sections:
    *   "Top Rated This Week"
    *   "Newly Added" (recently added to the library)
    *   "Editor’s Picks" (admin-curated recommendations)
    *   "price card" monthly, yearly, free

**All Movie/Series Page:**

*   Lists all published reviews in a paginated grid/card layout.
*   Sortable by:
    *   Recent (newest first)
    *   Top Rated (highest average rating)
    *   Most Liked (reviews with the most likes)
*   Filterable by:
    *   Genre (e.g., Action, Drama)
    *   Rating range (e.g., 7+ stars)
    *   Streaming platform (e.g., Netflix, Disney+)

**Movie/Series Details Page:**

*   Full review content with:
    *   Movie/series poster, title, and metadata (year, director, cast).
    *   User’s rating (1-10 stars) and written review.
    *   Spoiler warnings (if marked).
    *   Likes count and comment section.
*   Interactive elements:
    *   "Like" button (only for logged-in users).
    *   Comment form (with reply threading optional).
    *   "Add to Watchlist" button.
*   Admin-only actions (if logged in as admin):
    *   "Approve/Unpublish" toggle.
    *   "Delete Review" option.

* * *

### **Non-Functional Requirements:**

*   **Usability:** Clean, intuitive UI/UX for both users and admins.
*   **Maintainability:** Modular, clean, and well-documented code following RESTful API design principles.

* * *

**Important Note:**

This document provides a high-level overview of the core features and pages for the Street Food Finder Website. Add more pages (e.g., About Us, Contact, FAQ, Subscription Plans, User Profile).Think creatively and make the project your own — the more professional and complete your project looks, the better it will be for your portfolio and CV.

### **Technology Stack:**

*   **Frontend:**
    *   **Next.js** (for server-side rendering and static site generation).
    *   **Tailwind CSS** (for utility-first styling).
*   **Backend:**
    *   **Node.js** with **Express.js** (for RESTful API).
    *   **Prisma** (for database management).
*   **Database:**
    *   **PostgreSQL** (for relational data storage).
*   **Authentication:**
    *   **JWT** or **better auth** or **custom ** (for session management).
*   **Payment Integration:**
    *   **SSLCommerz** or **Stripe** (for premium subscriptions).
*   **Deployment:**
    *   Vercel, render, ralway for hosting and deployment.

* * *

### **Submission Guidelines:**

1. **GitHub repository** with a clear README explaining setup and functionality.
2. **Live site links** for both frontend and backend.
3. **Admin credentials** for testing.
4. An **overview video** demonstrating the functionality of the website.



another requirement 
Project Update-02 Requirements:
এই অ্যাসাইনমেন্টের উদ্দেশ্য হলো বিদ্যমান প্রজেক্টকে Feature-rich, Production-ready এবং Professional Standard এ উন্নীত করা। নতুন ফিচার যোগ করা অথবা এক্সিস্টিং ফিচারগুলোর UI/UX, পারফরম্যান্স ও স্ট্রাকচার পলিশ করা। এই রিকোয়ারমেন্টগুলো Event, Sports, E-commerce, Travel, Real Estate, Social, Wallet, Food, AI, Parcel Delivery সহ যেকোনো টাইপের প্রজেক্টের জন্য প্রযোজ্য হবে।
Core Requirements:
1. Global Layout & UI Standards
Navbar
প্রজেক্টের Primary/Secondary কালারের সাথে সামঞ্জস্যপূর্ণ ব্যাকগ্রাউন্ড থাকতে হবে।
দুই পাশে সমান সাইড মার্জিন থাকতে হবে।
ন্যূনতম ৬টি Navigation Route রাখতে হবে।
অন্তত ১টি Advanced Menu (Mega Menu / Dropdown / Contextual Menu) রাখতে হবে।
Scroll করার পর Sticky Navbar হতে হবে।
Mobile, Tablet ও Desktop উভয়ের জন্য রেস্পন্সিভ করতে হবে।
Footer
সম্পূর্ণ Functional Footer করতে হবে।
গুরুত্বপূর্ণ লিংক, কন্টাক্ট তথ্য, সোশ্যাল লিংক থাকতে হবে।
কোনো Dead / Unclickable Link রাখা যাবে।
2. Landing / Home Page Requirements
Navbar ও Footer সহ কমপক্ষে ১০টি Meaningful Section রাখতে হবে।
প্রতিটি সেকশন প্রজেক্টের Context অনুযায়ী হবে (যেমনঃ Features, Categories, Services, Highlights, Offers, Statistics, Blogs, Testimonials, Newsletter, FAQ ইত্যাদি)
Hero / Carousel Section
Height সর্বোচ্চ ৬০%–৭০% রাখতে হবে।
সেকশন Interactive হতে হবে (Slider, CTA, Animation, Auto/Manual control)।
পরবর্তী সেকশনের ভিজ্যুয়াল হিন্ট থাকতে হবে।
3. Core Content Listing Section
প্রজেক্ট অনুযায়ী Product, Service, Event, Property, Post, Package, Match, Delivery, AI Tool ইত্যাদি সেকশন রাখতে হবে।
Card/Grid Based Layout হতে হবে।
প্রতিটি Card-এ নিচের ইনফর্মেশন গুলো থাকতে হবে:
Title
Image/Icon
Short Description
Meta Info (Price, Date, Status, Rating, Location, Type ইত্যাদি)
Primary Action Button (View / Details / Join / Book / Buy / Explore)
Card Height Consistent হতে হবে।
Desktop এ ৪টি Card per row রাখা প্রেফারেবল।
Loading এর সময় Skeleton Loader ব্যবহার বাধ্যতামূলক।
4. Details Page
Details Page Publicly Accessible হতে হবে।
এক বা একাধিক Image / Media দেখাতে হবে।
আলাদা আলাদা Section থাকতে হবে:
Overview / Description
Key Information / Specs / Rules
Rating / Reviews / Feedback (যদি প্রযোজ্য হয়)
Related / Suggested Items
Action Functionality থাকতে হবে (যেমনঃ Enroll, Book, Buy, Join, Save, Wishlist, Share ইত্যাদি)
5. Listing / Explore Page
Dedicated Publicly Accessible Page for All Items
Mandatory Features:
Search Bar
Sidebar / Top Filters (যেমনঃ Category, Price/Range, Status, Rating, Date, Location ইত্যাদি)
Sorting Option
Pagination বা Infinite Scroll
Filter & Search সম্পূর্ণ Functional হতে হবে।
6. Authentication & Authorization
Functional Login & Registration Page থাকতে হবে।
Demo User / Admin Credential Button
ক্লিক করলে ফর্ম অটোমেটিক ফিল হবে।
Professional & Clean UI
Google / Facebook / Others Social Login 
7. Dashboard System (Role Based)
Multi-Role Dashboard (User / Admin / Manager / Vendor / Organizer ইত্যাদি) রাখতে হবে।
Navbar/Profile Icon সহ Dropdown Menu রাখতে হবে।
Sidebar Requirements:
User Role: ন্যূনতম ৩টি Menu Item থাকবে।
Admin/Advanced Role: ন্যূনতম ৫টি Menu Item থাকবে।
Dashboard Home Page:
Overview Cards
Bar / Line Chart
Pie / Donut Chart
Dynamic Table
সব ডাটা Backend থেকে ডাইনামিক হতে হবে।
My Profile Page
Full-width Proper Layout
Editable & Readable Profile Info
8. Additional Pages
Home ও Core Listing Page ছাড়াও কমপক্ষে ২–৩টি Relevant Page রাখতে হবে।
About
Contact
Blog
Help / Support
Privacy / Terms
সব পেজের ডিজাইন Complete ও Consistent হতে হবে।
9. UX, Responsiveness & Accessibility
কোনো Lorem Ipsum / Demo Text রাখা যাবে না।
Mobile, Tablet, Desktop সব ডিভাইসের জন্য Responsive করতে হবে।
Section to Section Spacing Balanced হতে হবে।
সব Button, Route ও Link Clickable হতে হবে।
Dark Mode থাকলে Background ও Text Contrast ঠিক আছে কিনা নিশ্চিত করতে হবে।
10. Performance & Quality
Data Load এর সময় Skeleton / Loader ব্যবহার করতে হবে।
No Console Error / Warning (Major)
Optimized Image & API Call Structure
Clean Folder Structure ও Meaningful Naming Convention
Submission Requirements:
Live Site Link
GitHub Repository Link
Frontend
Backend
Demo Credentials
User Email & Password
Admin Email & Password
