# Weather Dashboard

A modern React weather dashboard using the [OpenWeatherMap API](https://openweathermap.org/api).

## 🌟 Features

- **Real-time weather data** from OpenWeatherMap API
- **5-day forecast** with daily predictions
- **Hourly forecast** for the next 24 hours
- **Current location detection** using geolocation
- **City search** with error handling
- **Temperature unit toggle** (Celsius/Fahrenheit)
- **Local storage** to remember last searched city
- **Responsive design** that works on all devices
- **Beautiful modern UI** with smooth animations

## 🚀 Quick Start

### 1. Get Your API Key

1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Navigate to API keys section
4. Generate a new API key

### 2. Setup the Project

1. **Replace the API key** in `src/WeatherDashboard.jsx`:
   ```javascript
   const API_KEY = "YOUR_OPENWEATHERMAP_API_KEY"; // Replace with your actual API key
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

The app will open at `http://localhost:3000`

## 📁 Project Structure

```
weather-dashboard/
├── public/
│   └── index.html              # Main HTML template
├── src/
│   ├── App.jsx                 # Main App component
│   ├── App.css                 # App styles
│   ├── WeatherDashboard.jsx    # Main weather component
│   ├── WeatherDashboard.css    # Weather component styles
│   ├── index.js               # React entry point
│   └── index.css              # Global styles
├── package.json               # Dependencies and scripts
└── README.md                 # This file
```

## 🎯 How to Use

### Search by City Name
1. Enter a city name in the search box
2. Click "Search" or press Enter
3. View current weather, 5-day forecast, and hourly predictions

### Use Current Location
1. Click "Use Current Location" button
2. Allow location access when prompted
3. App automatically loads weather for your location

### Toggle Temperature Units
- Click °C or °F buttons to switch between units
- All temperature data updates automatically

## 🛠️ Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can't go back!**

## 🌐 Deployment

### Deploy to Netlify
1. Run `npm run build`
2. Upload the `build` folder to Netlify
3. Set up environment variables if needed

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow the prompts

## 🔧 Customization

### Styling
- Modify `src/WeatherDashboard.css` for component styles
- Edit `src/index.css` for global styles
- The design uses CSS Grid and Flexbox for responsive layouts

### Functionality
- Add more weather metrics in `WeatherDashboard.jsx`
- Implement weather alerts and notifications
- Add weather maps integration
- Include additional forecast periods

## 📊 API Information

This app uses the following OpenWeatherMap endpoints:

- **Current Weather**: `/weather` - Current weather conditions
- **5-Day Forecast**: `/forecast` - Weather forecast for 5 days
- **Geolocation**: Coordinates-based weather lookup

**API Limits (Free Plan):**
- 1,000 API calls per day
- 60 calls per minute

## 🐛 Troubleshooting

### Common Issues

1. **"Please set up your OpenWeatherMap API key"**
   - Replace `YOUR_OPENWEATHERMAP_API_KEY` with your actual API key

2. **"City not found"**
   - Check spelling of city name
   - Try including country code (e.g., "London, UK")

3. **Location access denied**
   - Enable location services in browser settings
   - Check site permissions for location access

4. **API request failed**
   - Verify internet connection
   - Check API key validity
   - Ensure you haven't exceeded rate limits

## 🔮 Future Enhancements

- Weather alerts and warnings
- Historical weather data
- Interactive weather maps
- Multiple location management
- Offline support with PWA features
- Push notifications
- Weather-based themes
- Social sharing features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons from [Font Awesome](https://fontawesome.com/)
- Built with [React](https://reactjs.org/)
- Styled with vanilla CSS and modern design principles
