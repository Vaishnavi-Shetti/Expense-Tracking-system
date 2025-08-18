# Expense Tracker

![Project Status](https://img.shields.io/badge/status-Completed-brightgreen)
![Tech Stack](https://img.shields.io/badge/stack-React%20%7C%20Node.js%20%7C%20MongoDB-blue)

---

## **Project Description**
**Expense Tracker** is a fullstack application that helps users track income, expenses, and budgets with ease. Features include:

- Secure user registration and authentication using JWT
- Add, view, and delete income and expenses
- Set and manage budgets
- Download income and expense reports in Excel format
- Upload profile images
- Dashboard analytics for better financial management

**Tech Stack:**

- **Frontend:** React (Vite), Tailwind CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Authentication:** JWT  
- **Deployment:** Render  

---

## **Folder Structure**
```bash
expense-tracker/
├─ backend/
│ ├─ controllers/
│ ├─ models/
│ ├─ routes/
│ ├─ index.js
│ └─ .env (ignored)
├─ frontend/expense-tracker/
│ ├─ src/
│ │ ├─ components/
│ │ ├─ pages/
│ │ ├─ utils/
│ │ └─ main.jsx
│ ├─ public/
│ │ └─ favicon.ico
│ └─ .env (ignored)
├─ README.md
└─ package.json
```

---

## **Installation Instructions**

### Prerequisites
- Node.js v18+  
- npm or yarn  
- MongoDB (Atlas or local)  

---

### Backend Setup

1. Clone the repository:

```bash
git clone <your-repo-url>
cd backend

2. Install dependencies:

    npm install

3.Create .env file:
    PORT=5000
    MONGO_URI=<your-mongo-db-uri>
    JWT_SECRET=<your-jwt-secret>

4. Start backend:
    npm start
```

### Frontend Setup
```bash
1.Navigate to frontend:
    cd frontend/expense-tracker
2. Install dependencies:
    npm install
3. Create .env file:
    VITE_API_URL=http://localhost:5000
4. Start development server:
    npm run dev
```

### Production build

`npm run build`

### Dependencies
- Backend
- express
- mongoose
- dotenv
- bcryptjs
- jsonwebtoken
- cors
- multer
- Frontend
- react
- react-router-dom
- axios
- tailwindcss
- react-icons
Run `npm install` in both backend and frontend folders to install all dependencies.

### Favicon Integration

- Place favicon.ico in frontend/public/

- Add this in index.html:

```html

<link rel="icon" href="/favicon.ico" type="image/x-icon" />

404 Page

Create NotFound.jsx in frontend/src/pages:

const NotFound = () => (
  <div className="flex items-center justify-center h-screen">
    <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
  </div>
);

export default NotFound;


Add route in App.jsx:

<Route path="*" element={<NotFound />} />
