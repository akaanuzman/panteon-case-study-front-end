# Panteon Case Study - Interactive Leaderboard

**Hello Panteon Games Team!**

I am delighted to have successfully completed this case study in line with the specified requirements. Throughout the process, I made sure to implement all the requested features. However, there is one aspect I was unable to complete: deploying the projects to a live environment.

Initially, my plan was to Dockerize each component separately and deploy them on a server. Unfortunately, I encountered unexpected challenges and was unable to finalize this process. Nevertheless, I hope that my work meets your expectations.

I wish you an enjoyable review of my case study and look forward to your feedback with great enthusiasm.

Thank you!

## Features

- 📊 **Dynamic Leaderboard Display**: Real-time display of player rankings with customizable columns
- 🔍 **Advanced Search Functionality**: Quick player search with autocomplete suggestions
- 🌍 **Country-based Grouping**: Group players by their countries with flag visualization
- ⚡ **Responsive Design**: Fully responsive interface that works on all devices
- 🎯 **Column Customization**: Drag-and-drop column reordering and order of columns
- 📱 **Modern UI**: Built with Ant Design components and styled components for a sleek user experience
- 🕒 **Timer**: Timer for the leaderboard end time

## Tech Stack

- **Framework**: Next.js
- **Language**: TypeScript
- **State Management**: React Query
- **UI Components**: Ant Design
- **Styling**: Styled Components
- **Table Management**: TanStack Table

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3001](http://localhost:3001) in your browser

## Project Structure

```
src/
├── app/              # Next.js app directory
├── components/       # Reusable UI components
├── hooks/            # Custom React hooks
├── providers/        # Context providers
├── services/         # API services
├── types/            # TypeScript type definitions
└── utils/            # Utility functions
```

## Key Components

- **Leaderboard**: Main component displaying player rankings
- **Search**: Advanced search functionality with suggestions
- **GroupedView**: Country-based grouping visualization
- **TableView**: Customizable table display with sorting

## Features in Detail

### Dynamic Table Management
- Sortable columns
- Drag-and-drop column reordering

### Search Functionality
- Real-time search suggestions
- Instant player highlighting
- Smooth scroll to searched player

### Data Visualization
- Country grouping with collapsible sections
- Flag icons for country representation
- Money and ranking visualization

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
