import { Activity } from '../models/activityInterface';

export const ACTIVITYS_VERSION = 2; // Muss jedes Mal erhöht werden, wenn Aktivitäten geändert werden.
export const ACTIVITYS: Activity[] = [
  {
    label: 'Guitar',
    description:
      'Expressing emotions and creating melodies through the strings',
    // Icon "Guitar instrument" von InfoBrother, lizenziert durch Flaticon, Lizenznehmer: user92498310, erhältlich auf https://www.flaticon.com/free-icon/guitar-instrument_5096217
    img: '/assets/guitar32.png',
    hoveredImg: '/assets/guitar32hovered.png',
    color: 'green',
    points: 1,
    isHovered: false,
    isNewActivity: false,
  },
  {
    label: 'E-mails',
    description: 'Communicating and staying connected digitally',
    // Icon "Email" von Freepik, lizenziert durch Flaticon, Lizenznehmer: user92498310, erhältlich auf https://www.flaticon.com/free-icon/email_542689
    img: '/assets/email32.png',
    hoveredImg: '/assets/email32hovered.png',
    color: 'blue',
    points: 1,
    isHovered: false,
    isNewActivity: false,
  },
  {
    label: 'Running',
    description: 'Active exercise for cardiovascular health',
    // Icon "Sneaker" von Us and Up, lizenziert durch Flaticon, Lizenznehmer: user92498310, erhältlich auf https://www.flaticon.com/free-icon/sneaker_8160075
    img: '/assets/running32.png',
    hoveredImg: '/assets/running32hovered.png',
    color: 'red',
    points: 1,
    isHovered: false,
    isNewActivity: false,
  },
  {
    label: 'Cleaning',
    description: 'Tidying up and maintaining a neat environment',
    // Icon "Window cleaning" von Fliqqer, lizenziert durch Flaticon, Lizenznehmer: user92498310, erhältlich auf https://www.flaticon.com/free-icon/window-cleaning_6216968
    img: '/assets/cleaning32.png',
    hoveredImg: '/assets/cleaning32hovered.png',
    color: 'blue',
    points: 1,
    isHovered: false,
    isNewActivity: false,
  },
  {
    label: 'Coding',
    description: 'Building and troubleshooting software',
    // Icon "Code" von Azland Studio, lizenziert durch Flaticon, Lizenznehmer: user92498310, erhältlich auf https://www.flaticon.com/free-icon/code_9777458
    img: '/assets/coding32.png',
    hoveredImg: '/assets/coding32hovered.png',
    color: 'blue',
    points: 1,
    isHovered: false,
    isNewActivity: false,
  },
  {
    label: 'Listening to Music',
    description: 'Relaxing the mind with melodies and rhythms',
    // Icon "Musical note" von Freepik, lizenziert durch Flaticon, Lizenznehmer: user92498310, erhältlich auf https://www.flaticon.com/free-icon/musical-note_461146
    img: '/assets/music32.png',
    hoveredImg: '/assets/music32hovered.png',
    color: 'green',
    points: 1,
    isHovered: false,
    isNewActivity: false,
  },
  {
    label: 'Working',
    description: 'Engaging in professional or personal tasks',
    // Icon "Portfolio" von Freepik, lizenziert durch Flaticon, Lizenznehmer: user92498310, erhältlich auf https://www.flaticon.com/free-icon/portfolio_1063299
    img: '/assets/working32.png',
    hoveredImg: '/assets/working32hovered.png',
    color: 'blue',
    points: 1,
    isHovered: false,
    isNewActivity: false,
  },
  {
    label: 'Reading',
    description:
      'Diving into stories, acquiring knowledge, and expanding horizons',
    // Icon "Open book" von Freepik, lizenziert durch Flaticon, Lizenznehmer: user92498310, erhältlich auf https://www.flaticon.com/free-icon/open-book_171322
    img: '/assets/reading32.png',
    hoveredImg: '/assets/reading32hovered.png',
    color: 'green',
    points: 1,
    isHovered: false,
    isNewActivity: false,
  },
  {
    label: 'Lifting',
    description: 'Strength training and muscle building',
    // Icon "Fitness" von Pixel perfect, lizenziert durch Flaticon, Lizenznehmer: user92498310, erhältlich auf https://www.flaticon.com/free-icon/fitness_3997413
    img: '/assets/lifting32.png',
    hoveredImg: '/assets/lifting32hovered.png',
    color: 'red',
    points: 1,
    isHovered: false,
    isNewActivity: false,
  },
  {
    label: 'Movie',
    description: 'Watching films for entertainment or relaxation',
    // Icon "Clapperboard" von SumberRejeki, lizenziert durch Flaticon, Lizenznehmer: user92498310, erhältlich auf https://www.flaticon.com/free-icon/clapperboard_4240150
    img: '/assets/movie32.png',
    hoveredImg: '/assets/movie32hovered.png',
    color: 'green',
    points: 1,
    isHovered: false,
    isNewActivity: false,
  },
  {
    label: 'Shopping',
    description: 'Purchasing goods or simply browsing stores',
    // Icon "Grocery store" von Frey Wazza, lizenziert durch Flaticon, Lizenznehmer: user92498310, erhältlich auf https://www.flaticon.com/free-icon/grocery-store_3514491
    img: '/assets/shopping32.png',
    hoveredImg: '/assets/shopping32hovered.png',
    color: 'blue',
    points: 1,
    isHovered: false,
    isNewActivity: false,
  },
  {
    label: 'Dating',
    description: 'Building connections and seeking relationships',
    // Icon "Hearts" von Vector Stall, lizenziert durch Flaticon, Lizenznehmer: user92498310, erhältlich auf https://www.flaticon.com/free-icon/hearts_8296231
    img: '/assets/dating32.png',
    hoveredImg: '/assets/dating32hovered.png',
    color: 'green',
    points: 1,
    isHovered: false,
    isNewActivity: false,
  },
  {
    label: 'Design',
    description: 'Crafting visuals and creating aesthetics',
    // Icon "Design" von Freepik, lizenziert durch Flaticon, Lizenznehmer: user92498310, erhältlich auf https://www.flaticon.com/free-icon/design_2011722
    img: '/assets/design32.png',
    hoveredImg: '/assets/design32hovered.png',
    color: 'blue',
    points: 1,
    isHovered: false,
    isNewActivity: false,
  },
  {
    label: 'Pilates',
    description:
      'A body conditioning routine to build flexibility and muscle strength',
    // Icon "Pilates ball" von Trazobanana, lizenziert durch Flaticon, Lizenznehmer: user92498310, erhältlich auf https://www.flaticon.com/free-icon/pilates-ball_5480612
    img: '/assets/pilates32.png',
    hoveredImg: '/assets/pilates32hovered.png',
    color: 'red',
    points: 1,
    isHovered: false,
    isNewActivity: false,
  },
  {
    label: 'Journaling',
    description: 'Expressing oneself through written words',
    // Icon "Writing" von Prosymbols Premium, lizenziert durch Flaticon, Lizenznehmer: user92498310, erhältlich auf https://www.flaticon.com/free-icon/writing_8400456
    img: '/assets/journaling32.png',
    hoveredImg: '/assets/journaling32hovered.png',
    color: 'green',
    points: 1,
    isHovered: false,
    isNewActivity: false,
  },
  {
    label: 'Meditating',
    description: 'Seeking inner peace and mindfulness',
    // Icon "Hinduist Yoga Position" von Freepik, lizenziert durch Flaticon, Lizenznehmer: user92498310, erhältlich auf https://www.flaticon.com/free-icon/hinduist-yoga-position_84081
    img: '/assets/meditating32.png',
    hoveredImg: '/assets/meditating32hovered.png',
    color: 'green',
    points: 1,
    isHovered: false,
    isNewActivity: false,
  },
  {
    label: 'Detoxing2',
    description: 'Cleansing body and mind from toxins',
    //Icon 'Detox' von Freepik, lizenziert durch Flaticon, Lizenznehmer: user92498310, erhältlich auf https://www.flaticon.com/free-icon/detox_3486867 
    img: '/assets/detox32.png',
    hoveredImg: '/assets/detox32hovered.png',
    color: 'red',
    points: 1,
    isHovered: false,
    isNewActivity: false,
  },
  {
    label: 'Photography',
    description: 'Capturing moments and scenes',
   //Icon 'Camera' von Ilham Fitrotul Hayat, lizenziert durch Flaticon, Lizenznehmer: user92498310, erhältlich auf https://www.flaticon.com/free-icon/camera_2956744
   img: '/assets/camera32.png',
    hoveredImg: '/assets/camera32hovered.png',
    color: 'blue',
    points: 1,
    isHovered: false,
    isNewActivity: false,
  },
  {
    label: 'Cycling',
    description: 'Riding a bike for cardiovascular health',
    // Icon 'Bicycle' von Freepik, lizenziert durch Flaticon, Lizenznehmer: user92498310, erhältlich auf https://www.flaticon.com/free-icon/bicycle_94203
    img: '/assets/cycling32.png',
    hoveredImg: '/assets/cycling32hovered.png',
    color: 'red',
    points: 1,
    isHovered: false,
    isNewActivity: false,
  },
  {
    label: 'Gardening',
    description: 'Planting and tending to flowers, fruits, and vegetables',
    // Icon 'Pot plant' von Creative Stall Premium, lizenziert durch Flaticon, Lizenznehmer: user92498310, erhältlich auf https://www.flaticon.com/free-icon/pot-plant_3043640

    img: '/assets/gardening32.png',
    hoveredImg: '/assets/gardening32hovered.png',
    color: 'green',
    points: 1,
    isHovered: false,
    isNewActivity: false,
  },
  {
    label: 'Dancing',
    description: 'Expressing oneself through movement',
    // Icon 'Man Dancing' von Freepik, lizenziert durch Flaticon, Lizenznehmer: user92498310, erhältlich auf https://www.flaticon.com/free-icon/man-dancing_10580
    img: '/assets/dancing32.png',
    hoveredImg: '/assets/dancing32hovered.png',
    color: 'red',
    points: 1,
    isHovered: false,
    isNewActivity: false,
  },
  {
    label: 'Yoga',
    description: 'Balancing mind and body with poses and breathing',
    // Icon 'Buddhist Yoga Pose' von Freepik, lizenziert durch Flaticon, Lizenznehmer: user92498310, erhältlich auf https://www.flaticon.com/free-icon/buddhist-yoga-pose_84145
    img: '/assets/yoga32.png',
    hoveredImg: '/assets/yoga32hovered.png',
    color: 'green',
    points: 1,
    isHovered: false,
    isNewActivity: false,
  },
];
