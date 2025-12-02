# CitySettle

A comprehensive platform designed to help students and newcomers find affordable accommodation and essential services in new cities.

## Overview

CitySettle connects students and new residents with budget-friendly options for:

- **Accommodation** - PG, hostels, apartments, and shared housing
- **Food Services** - Tiffin services, mess services, and home-cooked meals
- **Fitness** - Gyms and fitness centers
- **Essential Services** - Utilities, transportation, and local amenities

## Features

- 🔐 **User Authentication** - Secure signup/login with JWT and Google OAuth
- 🔍 **Smart Search** - Search by location, service type, and preferences
- 💰 **Budget Filters** - Filter services based on your budget range
- ⭐ **Ratings & Reviews** - User-generated ratings and reviews
- 💝 **Save Favorites** - Bookmark your favorite listings
- 📦 **Smart Combos** - Bundled services for maximum savings
- 📱 **Mobile-First UI** - Beautiful, responsive interface designed for mobile
- 🗺️ **Location-Based** - Find services near you with distance filters

## Tech Stack

### Backend

- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Passport.js** for Google OAuth
- **bcrypt** for password hashing

### Frontend

- **React 18** with Vite
- **React Router DOM** for navigation
- **Tailwind CSS** for styling
- **shadcn/ui** components
- **Axios** for API calls
- **Context API** for state management

## Project Structure

```
CitySettle/
├── backend/
│   ├── src/
│   │   ├── config/          # Database and environment config
│   │   ├── controllers/     # Request handlers
│   │   ├── middlewares/     # Auth middleware
│   │   ├── models/          # Mongoose models
│   │   └── routes/          # API routes
│   ├── .env                 # Environment variables
│   ├── server.js           # Entry point
│   └── seed.js             # Database seeding script
│
└── frontend/
    ├── src/
    │   ├── api/            # API service layer
    │   ├── components/     # React components
    │   ├── contexts/       # React contexts
    │   ├── hooks/          # Custom hooks
    │   └── constants/      # Constants and routes
    └── vite.config.js      # Vite configuration
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd CitySettel
```

2. **Setup Backend**

```bash
cd backend
npm install

# Copy environment example and configure
cp .env.example .env
# Edit .env with your MongoDB URL and JWT secret

# Start MongoDB (if running locally)
mongod

# Seed the database with sample data
npm run seed

# Start the backend server
npm run dev
```

The backend will run on `http://localhost:3000`

3. **Setup Frontend**

```bash
cd frontend
npm install

# Environment is already configured in .env
# If needed, update VITE_API_URL in .env

# Start the frontend development server
npm run dev
```

The frontend will run on `http://localhost:5173`

### Environment Variables

**Backend (.env)**

```env
PORT=3000
DB_URL=mongodb://localhost:27017/citySettle
JWT_SECRET=your_secure_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
CALLBACK_URL=http://localhost:3000/api/auth/google/callback
NODE_ENV=development
```

**Frontend (.env)**

```env
VITE_API_URL=http://localhost:3000/api
```

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/google` - Google OAuth login
- `GET /api/auth/google/callback` - Google OAuth callback

### Listings

- `GET /api/listings` - Get all listings (with filters)
- `GET /api/listings/:id` - Get single listing
- `POST /api/listings` - Create listing (auth required)
- `PUT /api/listings/:id` - Update listing (auth required)
- `DELETE /api/listings/:id` - Delete listing (auth required)

### Combos

- `GET /api/combos` - Get all combos (with filters)
- `GET /api/combos/:id` - Get single combo
- `POST /api/combos` - Create combo (auth required)
- `PUT /api/combos/:id` - Update combo (auth required)
- `DELETE /api/combos/:id` - Delete combo (auth required)

### User

- `GET /api/user/profile` - Get user profile (auth required)
- `PUT /api/user/profile` - Update profile (auth required)
- `GET /api/user/saved` - Get saved listings (auth required)
- `POST /api/user/saved` - Save a listing (auth required)
- `DELETE /api/user/saved/:listingId` - Unsave listing (auth required)

## Usage

1. **Sign up** for a new account or **login** with existing credentials
2. **Browse** listings by category (Accommodation, Food, Gym, Essentials)
3. **Search** for specific services or locations
4. **Filter** by budget, distance, ratings, and categories
5. **Save** your favorite listings for later
6. **View** smart combo deals for bundled savings
7. **Manage** your profile and saved items

## Database Models

### User

- fullName (firstName, lastName)
- email
- password (hashed)
- phone
- city
- savedItems (references to Listings)
- googleId (for OAuth)

### Listing

- name, type, description
- price, images
- location (address, city, coordinates, distance)
- rating, reviewCount
- amenities, availability
- owner details
- Type-specific fields (accommodationDetails, foodDetails, gymDetails, etc.)

### Combo

- title, description
- price, originalPrice, discount
- badge, image
- items (references to Listings)
- location (city, area)
- rating, reviewCount, availability

### Review

- user, listing/combo references
- rating, comment
- helpful count

## Development

### Backend Development

```bash
cd backend
npm run dev  # Runs with nodemon for auto-reload
```

### Frontend Development

```bash
cd frontend
npm run dev  # Runs Vite dev server with HMR
```

### Database Seeding

```bash
cd backend
npm run seed  # Populates database with sample data
```

## Features in Detail

### Authentication

- Secure JWT-based authentication
- Google OAuth integration
- Password hashing with bcrypt
- Protected routes with middleware

### Listing Management

- CRUD operations for listings
- Advanced filtering (price, rating, type, location)
- Search functionality
- Image upload support

### User Features

- Save/unsave favorite listings
- Profile management
- View saved items
- Personalized recommendations

### Smart Combos

- Bundled service packages
- Automatic discount calculations
- Popular and best value badges
- Category-wise combos

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Future Enhancements

- [ ] Payment gateway integration
- [ ] Real-time chat with service providers
- [ ] Map integration with Google Maps API
- [ ] Push notifications
- [ ] Review and rating system
- [ ] Admin dashboard
- [ ] Analytics and reporting
- [ ] Multi-city support
- [ ] Mobile app (React Native)

## License

This project is licensed under the MIT License.

## Support

For support, email support@citysettle.com or open an issue in the repository.

## Acknowledgments

- Design inspiration from Figma community
- UI components from shadcn/ui
- Icons from Lucide React
