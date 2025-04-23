# ISS Tracker

This application tracks and visualizes the current position of the International Space Station using real-time data.  
It was created as part of a coding assignment to demonstrate coding abilities by building a full-stack app from scratch, quickly and efficiently.

## Tech Stack

- **Server**: Node.js, Express, TypeScript  
- **Client**: React v18, TypeScript, Vite  
- **Tools**: Prettier, ESLint  
- **Libraries**: Leaflet  

## A Few Notes

- Clicking on the ISS image will popup its position details.
- App displays feedback based on server response or its absence.
- See [`server/README.md`](server/README.md) for API documentation.
- This project makes use of `.env` files in both the server and client, mainly to allow the user to define custom ports and avoid CORS issues.  
- At first, I considered using react-query and an API management library, but they were overkill for the single API request this project requires. I opted for "vanilla" React + Express instead.  
- In keeping with the times, I used AI in the creation of this project — specifically GitHub Copilot Agent mode in VSCode. You can see the initial [`docs/project-requirements.md`](docs/project-requirements.md) file that I provided to get a head start. That said, I faced countless issues and disappointments with its output, which had to be heavily reworked.  
- The ISS image was generated using ChatGPT.
- I like 2-space tabs and no semicolons at the end of lines.

## Environment Setup

You’ll need Node.js and npm installed.

1. Clone the repository:
   ```
   git clone https://github.com/guycastel/iss-tracker.git
   ```

2. Set up environment variables:  
   This step is **optional**, as default fallback values are hardcoded for all environment variables, assuming the default server and client ports are available.

   - For the server:  
     Create a `.env` file in the `server` directory. Use the `.env.example` file for reference.

   - For the client:  
     Create a `.env` file in the `client` directory. Use the `.env.example` file for reference.

3. Install server dependencies - in `server` directory run:
   ```
   npm install
   ```

4. Install client dependencies - in `client` directory run:
   ```
   npm install
   ```

## Running the Application

### Production Mode

1. Build and start the server - in `server` directory run:
   ```
   npm run build
   npm start
   ```

2. Build and serve the client - in `client` directory run:
   ```
   npm run build
   npm run preview
   ```

### Development Mode

1. Start the server in development mode - in `server` directory run:
   ```
   npm run dev
   ```

2. Start the client in development mode - in `client` directory run:
   ```
   npm run dev
   ```

- Access the application in your browser at `http://localhost:5173` (or another port if configured).

## To Do
(Bonus tasks and how would I solve them)
- [ ] ISS velocity and period (lap time):  
      Try to use [wheretheiss.at](https://wheretheiss.at/w/developer) public API.
      
- [ ] Night shadow - try to use [Leaflet.Terminator](https://github.com/joergdietrich/Leaflet.Terminator) plugin.

- [ ] Draw ISS flight path - to draw the path the ISS flew over the time the app was running I would save the last X positions we sampled (let's say in the frontend) and use them to draw a line on the map.  
      To draw the expected path we'll need to search harder for that data...
      
- [ ] Unit tests

## License

[MIT](LICENSE)

