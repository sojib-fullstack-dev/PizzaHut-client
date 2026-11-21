# 🍕 PizzaHut — Food Delivery & Vendor Management Platform

A modern, role-based food delivery web application built with **Next.js**, **TypeScript**, and **Tailwind CSS**, supporting **Customer**, **Vendor**, and **Admin** workflows.

---

## 🚀 Tech Stack

* **Framework:** Next.js (App Router) & React
* **Language:** TypeScript
* **Styling:** Tailwind CSS & Lucide Icons
* **Authentication:** Better Auth (Role-based access control)
* **Notifications:** React Toastify / Sonner
* **Payments:** Stripe Checkout (Vendor Premium Subscription)

---

## ✨ Key Features

### 🔐 Role-Based Authentication & Dashboards
* Separate dashboard views and route protection for **Customer**, **Vendor**, and **Admin** roles.

### 🍕 Menu Browsing & Item Details
* Browse available pizza and food items with detailed item pages showing price, description, and vendor information.

### 🛒 Order Management System
* Interactive order modal with **Delivery Date**, **Delivery Address**, and **Special Instructions** fields.
* Automatically attaches customer, vendor, and menu item details.
* Prevents vendors from ordering their own items and blocks duplicate active orders (`Pending` / `Accepted`) for the same item and delivery date.
* Tracks order lifecycle statuses: `Pending`, `Accepted`, `Rejected`, and `Cancelled`.

### 💳 Vendor Subscription (Stripe Checkout)
* Free vendors can publish up to **3 active menu items**.
* **Upgrade to Premium** flow powered by **Stripe Checkout** with dedicated **Payment Success** and **Payment Cancel** pages.
* Subscription status updates only after verified server-side webhook confirmation.

---

## ⚙️ Run Locally

1. **Install dependencies:**
   ```bash
   npm install
