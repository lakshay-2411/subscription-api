# 🔔 Scalable Subscription Management API with Expiration Queues

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

*A production-ready subscription management backend with automated expiration handling*

</div>

---

## 🚀 Overview

This project is a fully-featured **subscription management backend** built with Node.js, Express, MongoDB, and Redis using **BullMQ** for background job processing. It provides a complete solution for managing user subscriptions with automatic expiration handling, making it perfect for SaaS applications, content platforms, or any service requiring time-bound access control.

### ✨ Key Highlights

- 🔐 **Secure Authentication** - JWT-based user authentication system
- 📋 **Flexible Plan Management** - Create and manage multiple subscription tiers
- ⏰ **Automated Expiration** - Smart background job processing with BullMQ
- 📊 **Real-time Monitoring** - Visual queue management with BullBoard
- 🔄 **Retry Logic** - Robust error handling and job retry mechanisms
- 🏗️ **Scalable Architecture** - Built for production environments

---

### ✳️ Core Features

- **User Authentication**: Secure user registration and login with JWT token management
- **Subscription Plans**: Administrative interface for creating and managing different subscription tiers
- **Subscription Management**: Complete CRUD operations for user subscriptions
- **Automatic Expiration**: Intelligent BullMQ queue system that schedules and processes subscription expirations
- **Job Monitoring**: Real-time dashboard for monitoring background jobs and system health
- **Error Handling**: Comprehensive error management with retry mechanisms

### 🎯 Use Cases

- SaaS platforms with tiered access
- Content subscription services
- Online course platforms
- Premium feature management
- Time-limited service access

---

## 🧰 Technology Stack

| Category | Technology | Purpose |
|----------|------------|---------|
| **Runtime** | Node.js | Server-side JavaScript execution |
| **Framework** | Express.js | Web application framework |
| **Database** | MongoDB + Mongoose | Document database with ODM |
| **Authentication** | JWT | Secure token-based authentication |
| **Queue System** | Redis + BullMQ | Background job processing |
| **Monitoring** | BullBoard | Job queue visualization |
| **Configuration** | dotenv | Environment variable management |
| **Module System** | ESM | Modern JavaScript modules |

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Redis server
- npm or yarn package manager

### 1. Clone & Install

```bash
# Clone the repository
git clone https://github.com/lakshay-2411/subscription-api.git
cd subscription-management-api

# Install dependencies
npm install
```

### 2. Environment Configuration

Create a `.env` file in the project root:

```env
# Server Configuration
PORT=5000

# Database
MONGO_URI=mongodb://localhost:27017/subscriptionDb

# Authentication
JWT_SECRET=your_secret_key

# Redis Configuration
REDIS_URL=redis://localhost:6379
```

### 3. Start Services

**Using Docker (Recommended):**
```bash
docker run -p 6379:6379 redis
```

### 4. Launch the Application

```bash
npm run dev
```

### 5. Access the Dashboard

- **API Server**: [http://localhost:5000](http://localhost:5000)
- **Queue Dashboard**: [http://localhost:5000/admin/queues](http://localhost:5000/admin/queues)

---

## 📁 Project Architecture

```
subscription-api/
├── 📁 config/
│   ├── db.js                    
│   └── redis.js                 
├── 📁 controllers/
│   ├── authController.js        
│   ├── planController.js        
│   └── subscriptionController.js 
├── 📁 models/
│   ├── User.js                  
│   ├── Plan.js
│   └── Subscription.js          
├── 📁 queues/
│   ├── expirationQueue.js
│   └── subscriptionJobs.js      
├── 📁 routes/
│   ├── authRoutes.js           
│   ├── planRoutes.js           
│   └── subscriptionRoutes.js   
├── 📁 middleware/
│   ├── auth.js                 
│   └── errorHandler.js           
├── 📁 utils/
│   ├── bullBoard.js   
│   └── jwt.js          
├── .env                        
├── .gitignore                  
├── package.json                
└── server.js                   
```

---

## 📡 API Documentation

### 🔐 Authentication Endpoints

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| `POST` | `/api/auth/register` | Register new user | `{ email, password, name }` |
| `POST` | `/api/auth/login` | User login | `{ email, password }`

**Example Registration:**
```json
POST /api/auth/register
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

### 📦 Subscription Plans

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `POST` | `/plans/createplan` | Create new plan | Admin only |
| `GET` | `/plans` | List all plans | Public |

**Example Plan Creation:**
```json
POST /plans/createplan
{
  "name": "Premium Plan",
  "price": 29.99,
  "duration": "30",
  "features": ["Unlimited Access", "Priority Support"]
}
```

### 📅 Subscription Management

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| `POST` | `/subscriptions` | Create subscription | Required |
| `GET` | `/subscriptions/:userId` | Get user subscriptions | Required |
| `PUT` | `/subscriptions/:userId` | Update subscription | Required |
| `DELETE` | `/subscriptions/:userId` | Cancel subscription | Required |

**Example Subscription Creation:**
```json
POST /subscriptions
{
  "userId": "user_id_here",
  "planId": "plan_id_here",
}
```

---

## ⚙️ Queue System Architecture

### 🔄 Job Processing Flow

1. **Subscription Creation** → Triggers expiration job scheduling
2. **Job Scheduling** → BullMQ adds delayed job to queue
3. **Job Processing** → Worker processes expiration when time arrives
4. **Status Update** → Subscription marked as expired

### 📊 Queue Monitoring

Access the BullBoard dashboard at `/admin/queues` to monitor:

- **Active Jobs**: Currently processing
- **Waiting Jobs**: Scheduled for future execution
- **Completed Jobs**: Successfully processed
- **Failed Jobs**: Errors and retry attempts
- **Queue Statistics**: Performance metrics