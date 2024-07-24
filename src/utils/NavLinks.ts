
import {  Earth, Newspaper, Activity, ChartNoAxesCombined, CloudUpload } from "lucide-react";

export const NavLinks = [
    { title: 'Statistics and Analytics', icon: ChartNoAxesCombined, path: '/dashboard/statistics' },
    { title: 'Upload New Paper', icon: CloudUpload, path: '/dashboard/upload' },
    { title: 'Feeds', icon: Newspaper, path: '/feeds' },
    { title: 'Recent Activities', icon: Activity, path: '/dashboard/activities' },
    { title: 'Discover', icon: Earth, path: '/dashboard/discover' },
  ];