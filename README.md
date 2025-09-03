Earthquake Visualizer  

Overview  
The Earthquake Visualizer is a web application that displays recent earthquake data on an interactive map.  
It fetches real-time earthquake information from the USGS Earthquake API and provides users with a clear, visual way to explore earthquake activity worldwide.  

Tech Stack  
- Framework:React  
- Styling:Tailwind CSS  
- State Management: React Hooks & Context API  
- Data Source:[USGS Earthquake API] (https://earthquake.usgs.gov/fdsnws/event/1/)  
- Deployment: CodeSandbox / StackBlitz / Vercel  

Installation & Setup  

Insatall dependencies:
npm install

npm run dev

Live Application Link
 – https://earthquackvisualizer.netlify.app/

Features:
1.Fetches real-time earthquake data from the USGS API.
2.Displays earthquakes on an interactive map with markers.
3.Marker size & color indicate earthquake magnitude.
4.Clickable markers show earthquake details (location, time, magnitude, depth).
5.Responsive design for desktop and mobile users.

Approach & Notes:
1.Data is fetched from the USGS Earthquake API (public, no authentication needed).
2.Used Leaflet.js (via React-Leaflet) for map rendering and interactive markers.
3.Focused on a clean UI with Tailwind CSS.
4.Limited to the most recent earthquake events for performance reasons.

Future Improvements:
1.Add filters (by region, magnitude, or time).
2.Include charts/graphs for earthquake trends.
3.Implement offline mode using cached data.

Project Structure:

<img width="398" height="339" alt="Screenshot 2025-09-03 232618" src="https://github.com/user-attachments/assets/79fb0b09-a1eb-43c3-b7fb-f7060007ff40" />

App Demo:
Full view: <img width="1918" height="961" alt="image" src="https://github.com/user-attachments/assets/f6fb3370-7cca-493b-b905-5990f1aedd39" />
Buttons: <img width="1919" height="978" alt="image" src="https://github.com/user-attachments/assets/4b12ad03-2164-4dac-bdcb-5a9fbe5f8ab5" />
Earthquake Location Detail: <img width="1919" height="915" alt="image" src="https://github.com/user-attachments/assets/4dd4b008-47ee-4dc2-ba4f-40dac6de9bfc" />

Contribution:
This is a take-home challenge project, but feel free to fork and extend.

MIT License

Copyright (c) 2025 [Kirti Gunjan]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.



Clone the repo:  
```bash
git clone https://github.com/your-username/earthquake-visualizer.git
cd earthquake-visualizer


