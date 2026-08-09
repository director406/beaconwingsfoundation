import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Upload, Medal, TrendingUp, MapPin, Clock, Award, Users, Heart, CheckCircle, BarChart3, Megaphone } from "lucide-react";
import { Button, Card } from "../../components";
import { getCurrentUser, isAuthenticated } from "../../services/authService";
import { saveCheckIn, getCheckIns, getAllCheckIns } from "../../services/firestoreService";
import { ROUTES, FORM_INPUT } from "../../utils/constants";
import useDocumentMeta from "../../hooks/useDocumentMeta";

const BADGES = [
  { name: "Spark", drives: 1, icon: "✨", color: "bg-slate-500" },
  { name: "Flame", drives: 10, icon: "🔥", color: "bg-teal-500" },
  { name: "Beacon", drives: 50, icon: "💡", color: "bg-purple-500" },
  { name: "Sun", drives: 100, icon: "☀️", color: "bg-amber-500" },
];

function CheckInPage() {
  useDocumentMeta("Check In", "Log your volunteer activity and track your impact with Beacon Wings Foundation.");
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [checkInData, setCheckInData] = useState({
    activity: "",
    location: "",
    campaign: "",
    beneficiaries: "",
    hours: "",
    notes: "",
    photo: null
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [recentCheckIns, setRecentCheckIns] = useState([]);
  const [allCheckIns, setAllCheckIns] = useState([]);
  const [userStats, setUserStats] = useState({ totalDrives: 0, currentBadge: null });
  const [success, setSuccess] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedCampaign, setSelectedCampaign] = useState("all");

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate(ROUTES.LOGIN);
      return;
    }
    const user = getCurrentUser();
    setCurrentUser(user);
    loadCheckInData(user.id);
  }, [navigate]);

  const loadCheckInData = async (userId) => {
    try {
      // Personal check-ins → badge & stats only
      const userCheckIns = await getCheckIns(userId);
      const totalDrives  = userCheckIns.length;
      const currentBadge = BADGES.filter(b => totalDrives >= b.drives).pop() || null;
      setUserStats({ totalDrives, currentBadge });

      // All volunteers' check-ins → public feed, city stats, leaderboard
      const everyone = await getAllCheckIns();
      setAllCheckIns(everyone);
      setRecentCheckIns(everyone.slice(0, 24));
    } catch {
      // Firebase not configured — fall back to localStorage
      const allCheckInsData = JSON.parse(localStorage.getItem("iiwc_checkins") || "[]");
      const userCheckIns    = allCheckInsData.filter(c => c.userId === userId);
      const totalDrives     = userCheckIns.length;
      const currentBadge    = BADGES.filter(b => totalDrives >= b.drives).pop() || null;
      setUserStats({ totalDrives, currentBadge });
      setAllCheckIns(allCheckInsData);
      setRecentCheckIns([...allCheckInsData].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 24));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCheckInData({ ...checkInData, photo: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    setCheckInData({ ...checkInData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const checkIn = {
      id:            Date.now().toString(),
      userId:        currentUser.id,
      userName:      currentUser.name,
      activity:      checkInData.activity,
      location:      checkInData.location,
      campaign:      checkInData.campaign,
      beneficiaries: parseInt(checkInData.beneficiaries),
      hours:         parseFloat(checkInData.hours),
      notes:         checkInData.notes,
      photo:         previewImage ?? null,
      timestamp:     new Date().toISOString(),
    };

    try {
      await saveCheckIn({
        userId:        currentUser.id,
        userName:      currentUser.name,
        activity:      checkInData.activity,
        location:      checkInData.location,
        campaign:      checkInData.campaign,
        beneficiaries: checkInData.beneficiaries,
        hours:         checkInData.hours,
        notes:         checkInData.notes,
        photo:         previewImage ?? null,
      });
    } catch {
      // Firebase not configured — save locally
      const stored = JSON.parse(localStorage.getItem("iiwc_checkins") || "[]");
      stored.push(checkIn);
      localStorage.setItem("iiwc_checkins", JSON.stringify(stored));
    }

    await loadCheckInData(currentUser.id);
    setSuccess("Check-in successful!");
    setCheckInData({ activity: "", location: "", campaign: "", beneficiaries: "", hours: "", notes: "", photo: null });
    setPreviewImage(null);
    setTimeout(() => setSuccess(""), 3000);
  };

  const getNextBadge = () => {
    return BADGES.find(b => b.drives > userStats.totalDrives);
  };

  const getBadgeProgress = () => {
    const nextBadge = getNextBadge();
    if (!nextBadge) return 100;
    return (userStats.totalDrives / nextBadge.drives) * 100;
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const then = new Date(timestamp);
    const diff = Math.floor((now - then) / 1000); // seconds

    if (diff < 60) return `${diff} seconds ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return `${Math.floor(diff / 86400)} days ago`;
  };

  // Get all unique cities
  const getAllCities = () => {
    const cities = new Set(allCheckIns.map(c => c.location));
    return Array.from(cities).sort();
  };

  // Get all unique campaigns (excludes check-ins with no campaign set)
  const getAllCampaigns = () => {
    const campaigns = new Set(allCheckIns.map(c => c.campaign).filter(Boolean));
    return Array.from(campaigns).sort();
  };

  // Get filtered check-ins based on selected city and/or campaign
  const getFilteredCheckIns = () => {
    return recentCheckIns
      .filter(c => selectedCity === "all" || c.location === selectedCity)
      .filter(c => selectedCampaign === "all" || c.campaign === selectedCampaign);
  };

  // Calculate weekly stats
  const getWeeklyStats = () => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const dataToUse = allCheckIns
      .filter(c => selectedCity === "all" || c.location === selectedCity)
      .filter(c => selectedCampaign === "all" || c.campaign === selectedCampaign);
    const weeklyCheckIns = dataToUse.filter(
      c => new Date(c.timestamp) > oneWeekAgo
    );
    
    const totalVolunteers = new Set(weeklyCheckIns.map(c => c.userId)).size;
    const totalBeneficiaries = weeklyCheckIns.reduce((sum, c) => sum + (c.beneficiaries || 0), 0);
    const totalHours = weeklyCheckIns.reduce((sum, c) => sum + (c.hours || 0), 0);
    
    return { volunteers: totalVolunteers, beneficiaries: totalBeneficiaries, hours: totalHours, activities: weeklyCheckIns.length };
  };

  // Get city-wise statistics
  const getCityStats = () => {
    const cityMap = {};
    const dataToUse = allCheckIns
      .filter(c => selectedCity === "all" || c.location === selectedCity)
      .filter(c => selectedCampaign === "all" || c.campaign === selectedCampaign);
    dataToUse.forEach(checkIn => {
      const city = checkIn.location;
      cityMap[city] = (cityMap[city] || 0) + 1;
    });
    
    return Object.entries(cityMap)
      .map(([city, count]) => ({ city, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);
  };

  // Get campaign-wise statistics (mirrors getCityStats)
  const getCampaignStats = () => {
    const campaignMap = {};
    const dataToUse = allCheckIns
      .filter(c => selectedCity === "all" || c.location === selectedCity)
      .filter(c => selectedCampaign === "all" || c.campaign === selectedCampaign);
    dataToUse.forEach(checkIn => {
      if (!checkIn.campaign) return; // skip check-ins with no campaign tagged
      campaignMap[checkIn.campaign] = (campaignMap[checkIn.campaign] || 0) + 1;
    });

    return Object.entries(campaignMap)
      .map(([campaign, count]) => ({ campaign, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);
  };

  // Get activity type breakdown
  const getActivityBreakdown = () => {
    const activityMap = {};
    const dataToUse = allCheckIns
      .filter(c => selectedCity === "all" || c.location === selectedCity)
      .filter(c => selectedCampaign === "all" || c.campaign === selectedCampaign);
    dataToUse.forEach(checkIn => {
      const activity = checkIn.activity;
      activityMap[activity] = (activityMap[activity] || 0) + 1;
    });
    
    return Object.entries(activityMap)
      .map(([activity, count]) => ({ activity, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  };

  // Get top volunteers
  const getTopVolunteers = () => {
    const volunteerMap = {};
    recentCheckIns.forEach(checkIn => {
      if (!volunteerMap[checkIn.userId]) {
        volunteerMap[checkIn.userId] = {
          id: checkIn.userId,
          name: checkIn.userName,
          count: 0,
          photo: checkIn.photo
        };
      }
      volunteerMap[checkIn.userId].count++;
    });
    
    return Object.values(volunteerMap)
      .sort((a, b) => b.count - a.count)
      .slice(0, 6)
      .map(v => ({
        ...v,
        badge: BADGES.filter(b => v.count >= b.drives).pop() || BADGES[0]
      }));
  };

  if (!currentUser) return null;

  const allCities = getAllCities();
  const filteredCheckIns = getFilteredCheckIns();
  const weeklyStats = getWeeklyStats();
  const cityStats = getCityStats();
  const allCampaigns = getAllCampaigns();
  const campaignStats = getCampaignStats();
  const activityBreakdown = getActivityBreakdown();
  const topVolunteers = getTopVolunteers();

  return (
    <>
      {/* Hero Section */}
      <section className="bg-surface dark:bg-slate-800 py-20">
        <div className="container-max">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <h1 className="text-4xl font-bold leading-tight text-slate-900 dark:text-white sm:text-5xl">Check-In to Your BWF Activity</h1>
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
                Share your volunteer journey by uploading a photo and earn recognition badges that showcase your impact
              </p>
              <button
                onClick={() => document.getElementById('checkin-form').scrollIntoView({ behavior: 'smooth' })}
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-white transition hover:bg-primary/90"
              >
                <CheckCircle size={24} />
                Check-In Now
              </button>
            </div>
            
            {/* Badges Display */}
            <div className="grid grid-cols-2 gap-6">
              {BADGES.map((badge) => (
                <div key={badge.name} className="text-center">
                  <div className="relative mx-auto mb-3 flex h-24 w-24 items-center justify-center">
                    {/* Hexagonal Shape Background */}
                    <div className={`absolute inset-0 ${badge.color} opacity-20`} style={{
                      clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
                    }} />
                    <div className={`absolute inset-2 ${badge.color}`} style={{
                      clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
                    }} />
                    <span className="relative z-10 text-4xl">{badge.icon}</span>
                  </div>
                  <p className="font-bold uppercase tracking-wide text-slate-900 dark:text-white">{badge.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{badge.drives} {badge.drives === 1 ? 'Activity' : 'Activities'}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Weekly Impact Stats */}
      <section className="bg-white dark:bg-slate-900 py-12">
        <div className="container-max">
          {selectedCity !== "all" && (
            <div className="mb-6 text-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">Showing data for</p>
              <h3 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{selectedCity}</h3>
            </div>
          )}
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-l-4 border-primary">
              <div className="text-center">
                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Users className="text-primary" size={32} />
                </div>
                <p className="text-4xl font-bold text-primary">{weeklyStats.volunteers}</p>
                <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-300">Volunteers Active</p>
                <p className="text-xs text-slate-400 dark:text-slate-500">Last 7 days</p>
              </div>
            </Card>

            <Card className="border-l-4 border-red-600 dark:border-red-500">
              <div className="text-center">
                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 dark:bg-red-900/20">
                  <Heart className="text-red-600 dark:text-red-400" size={32} />
                </div>
                <p className="text-4xl font-bold text-red-600 dark:text-red-400">{weeklyStats.beneficiaries.toLocaleString()}</p>
                <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-300">Lives Impacted</p>
                <p className="text-xs text-slate-400 dark:text-slate-500">Last 7 days</p>
              </div>
            </Card>

            <Card className="border-l-4 border-accent">
              <div className="text-center">
                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                  <Award className="text-accent" size={32} />
                </div>
                <p className="text-4xl font-bold text-accent">{weeklyStats.activities}</p>
                <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-300">Activities Completed</p>
                <p className="text-xs text-slate-400 dark:text-slate-500">Last 7 days</p>
              </div>
            </Card>

            <Card className="border-l-4 border-purple-700 dark:border-purple-500">
              <div className="text-center">
                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-purple-50 dark:bg-purple-900/20">
                  <Clock className="text-purple-700 dark:text-purple-400" size={32} />
                </div>
                <p className="text-4xl font-bold text-purple-700 dark:text-purple-400">{weeklyStats.hours.toFixed(0)}</p>
                <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-300">Hours Volunteered</p>
                <p className="text-xs text-slate-400 dark:text-slate-500">Last 7 days</p>
              </div>
            </Card>
          </div>

          {/* User Progress */}
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <Card>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-3 text-primary">
                    <Award size={28} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Your Activities</p>
                    <p className="text-3xl font-bold text-primary">{userStats.totalDrives}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Current Badge</p>
                  <p className="text-2xl font-bold text-primary">
                    {userStats.currentBadge ? `${userStats.currentBadge.icon} ${userStats.currentBadge.name}` : "🌟 Start Now"}
                  </p>
                </div>
              </div>
              
              {getNextBadge() && (
                <>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-slate-600 dark:text-slate-300">Progress to {getNextBadge().icon} {getNextBadge().name}</span>
                      <span className="font-bold text-primary">{userStats.totalDrives}/{getNextBadge().drives}</span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                      <div 
                        className="h-full bg-primary transition-all duration-500"
                        style={{ width: `${getBadgeProgress()}%` }}
                      />
                    </div>
                  </div>
                </>
              )}

              {userStats.currentBadge && (
                <button
                  onClick={() => navigate(ROUTES.CERTIFICATE, {
                    state: {
                      volunteerName: currentUser.name,
                      badgeName: userStats.currentBadge.name,
                      badgeIcon: userStats.currentBadge.icon,
                      totalDrives: userStats.totalDrives,
                    },
                  })}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-primary/30 bg-primary/5 px-4 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary/10 dark:border-primary/40 dark:bg-primary/10"
                >
                  <Award size={16} />
                  View Your Certificate
                </button>
              )}
            </Card>

            <Card className="bg-surface dark:bg-slate-800">
              <div className="text-center">
                <p className="text-sm font-semibold uppercase tracking-wide text-primary">Join the Movement</p>
                <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">Check-in to your next activity!</h3>
                <p className="mt-2 text-slate-600 dark:text-slate-300">And you may see yourself featured here</p>
                <button
                  onClick={() => document.getElementById('checkin-form').scrollIntoView({ behavior: 'smooth' })}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-white font-semibold transition hover:bg-primary/90"
                >
                  <CheckCircle size={20} />
                  Check-In Now
                </button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Check-Ins Section */}
      <section className="bg-slate-50 dark:bg-slate-800 py-16">
        <div className="container-max">
          <div className="mb-8">
            <div className="text-center mb-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">RECENT CHECK-INS</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                Volunteers Making Impact Across India
              </h2>
              <p className="mt-2 text-slate-600 dark:text-slate-300">Real-time updates from our volunteer community</p>
            </div>
            
            {/* City Selector */}
            <div className="flex justify-center items-center gap-4 mt-6">
              <div className="flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-6 py-3 shadow-sm">
                <MapPin className="text-primary" size={20} />
                <div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">Look up any city</p>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="mt-1 border-0 bg-transparent text-base font-semibold text-slate-900 dark:text-white outline-none cursor-pointer"
                  >
                    <option value="all">All Cities</option>
                    {allCities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </div>

              {allCampaigns.length > 0 && (
                <div className="flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-6 py-3 shadow-sm">
                  <Megaphone className="text-accent" size={20} />
                  <div>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">Filter by campaign</p>
                    <select
                      value={selectedCampaign}
                      onChange={(e) => setSelectedCampaign(e.target.value)}
                      className="mt-1 border-0 bg-transparent text-base font-semibold text-slate-900 dark:text-white outline-none cursor-pointer"
                    >
                      <option value="all">All Campaigns</option>
                      {allCampaigns.map(campaign => (
                        <option key={campaign} value={campaign}>{campaign}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
              
              {(selectedCity !== "all" || selectedCampaign !== "all") && (
                <button
                  onClick={() => { setSelectedCity("all"); setSelectedCampaign("all"); }}
                  className="text-sm font-medium text-primary hover:text-primary/80 underline"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>

          {filteredCheckIns.length === 0 ? (
            <Card className="text-center py-12">
              <Camera size={64} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
              <p className="text-xl font-semibold text-slate-600 dark:text-slate-300">No check-ins yet</p>
              <p className="text-slate-500 dark:text-slate-400 mt-2">
                {selectedCity === "all" 
                  ? "Be the first to share your volunteer activity!" 
                  : `No check-ins found in ${selectedCity}`}
              </p>
            </Card>
          ) : (
            <>
              {selectedCity !== "all" && (
                <div className="mb-6 text-center">
                  <p className="text-lg font-semibold text-slate-700 dark:text-slate-200">
                    <span className="text-primary">{filteredCheckIns.length}</span> {filteredCheckIns.length === 1 ? 'check-in' : 'check-ins'} in <span className="text-primary">{selectedCity}</span>
                  </p>
                </div>
              )}
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                {filteredCheckIns.map((checkIn) => (
                  <div key={checkIn.id} className="group relative aspect-square overflow-hidden rounded-xl shadow-md transition hover:shadow-xl">
                    {checkIn.photo ? (
                      <img 
                        src={checkIn.photo} 
                        alt={checkIn.activity}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-primary">
                        <Camera size={48} className="text-white opacity-50" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                      <p className="font-bold text-sm">{checkIn.location}</p>
                      {checkIn.campaign && (
                        <p className="text-xs text-accent font-medium mt-0.5">📢 {checkIn.campaign}</p>
                      )}
                      <p className="text-xs text-white/80 flex items-center gap-1 mt-1">
                        <Clock size={12} />
                        {formatTimeAgo(checkIn.timestamp)}
                      </p>
                    </div>
                    <div className="absolute top-2 right-2">
                      <div className="rounded-full bg-white/90 px-2 py-1 text-xs font-semibold text-primary">
                        {checkIn.activity}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Analytics & Highlights */}
      <section className="bg-white dark:bg-slate-900 py-16">
        <div className="container-max">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-accent">ACTIVITY HIGHLIGHTS</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              {selectedCity === "all" ? "Impact Across the Nation" : `Impact in ${selectedCity}`}
            </h2>
          </div>

          <div className={`grid gap-8 ${allCampaigns.length > 0 ? "lg:grid-cols-3" : "lg:grid-cols-2"}`}>
            {/* City Leaderboard */}
            <Card className="p-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-full bg-accent/10 p-3">
                  <MapPin className="text-accent" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Top Cities</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Most active locations in last 30 days</p>
                </div>
              </div>
              
              {cityStats.length > 0 ? (
                <div className="space-y-4">
                  {cityStats.map((city, index) => {
                    const maxCount = cityStats[0]?.count || 1;
                    const percentage = (city.count / maxCount) * 100;
                    
                    return (
                      <div key={city.city}>
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2">
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                              {index + 1}
                            </span>
                            <span className="font-semibold text-slate-700 dark:text-slate-200">{city.city}</span>
                          </div>
                          <span className="text-lg font-bold text-primary">{city.count}</span>
                        </div>
                        <div className="h-2.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                          <div 
                            className="h-full rounded-full bg-primary"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-center text-slate-400 dark:text-slate-500 py-8">No data available yet</p>
              )}
            </Card>

            {/* Campaign Leaderboard — only shown once at least one check-in has been tagged with a campaign */}
            {allCampaigns.length > 0 && (
              <Card className="p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-full bg-accent/10 p-3">
                    <Megaphone className="text-accent" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Top Campaigns</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Most active drives right now</p>
                  </div>
                </div>

                {campaignStats.length > 0 ? (
                  <div className="space-y-4">
                    {campaignStats.map((c, index) => {
                      const maxCount = campaignStats[0]?.count || 1;
                      const percentage = (c.count / maxCount) * 100;

                      return (
                        <div key={c.campaign}>
                          <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center gap-2">
                              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
                                {index + 1}
                              </span>
                              <span className="font-semibold text-slate-700 dark:text-slate-200">{c.campaign}</span>
                            </div>
                            <span className="text-lg font-bold text-accent">{c.count}</span>
                          </div>
                          <div className="h-2.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                            <div
                              className="h-full rounded-full bg-accent"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-center text-slate-400 dark:text-slate-500 py-8">No data available yet</p>
                )}
              </Card>
            )}

            {/* Activity Type Breakdown */}
            <Card className="p-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-3">
                  <BarChart3 className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Activity Breakdown</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Popular volunteer activities</p>
                </div>
              </div>
              
              {activityBreakdown.length > 0 ? (
                <div className="space-y-4">
                  {activityBreakdown.map((activity, index) => {
                    // Rotates through colors already used elsewhere in the app's
                    // palette (pillar cards, badges) instead of introducing new ones.
                    const colors = ['bg-primary', 'bg-accent', 'bg-teal-600', 'bg-purple-700'];
                    const maxCount = activityBreakdown[0]?.count || 1;
                    const percentage = (activity.count / maxCount) * 100;
                    
                    return (
                      <div key={activity.activity}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold text-slate-700 dark:text-slate-200">{activity.activity}</span>
                          <span className="text-lg font-bold text-primary">{activity.count}</span>
                        </div>
                        <div className="h-2.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                          <div 
                            className={`h-full rounded-full ${colors[index % colors.length]}`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-center text-slate-400 dark:text-slate-500 py-8">No data available yet</p>
              )}
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Volunteers */}
      {topVolunteers.length > 0 && (
        <section className="bg-white dark:bg-slate-900 py-16">
          <div className="container-max">
            <div className="mb-8 text-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">CHAMPIONS OF CHANGE</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">Most Active Volunteers</h2>
              <p className="mt-2 text-slate-600 dark:text-slate-300">Recognizing our dedicated community leaders</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              {topVolunteers.map((volunteer) => (
                <Card key={volunteer.id} className="relative overflow-hidden text-center transition hover:shadow-xl">
                  {volunteer.photo ? (
                    <div className="aspect-square overflow-hidden">
                      <img 
                        src={volunteer.photo} 
                        alt={volunteer.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="aspect-square flex items-center justify-center bg-primary">
                      <span className="text-6xl font-bold text-white">
                        {volunteer.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  
                  {/* Badge overlay */}
                  <div className="absolute top-2 right-2">
                    <div className="relative flex h-14 w-14 items-center justify-center">
                      <div className={`absolute inset-0 ${volunteer.badge.color}`} style={{
                        clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
                      }} />
                      <span className="relative z-10 text-2xl">{volunteer.badge.icon}</span>
                    </div>
                  </div>

                  <div className="p-4">
                    <p className="font-bold text-slate-900 dark:text-white">{volunteer.name}</p>
                    <p className="text-sm font-medium text-primary">Latest {volunteer.badge.name}</p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{volunteer.count} {volunteer.count === 1 ? 'Activity' : 'Activities'}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Check-In Form */}
      <section className="bg-white dark:bg-slate-900 py-16">
        <div className="container-max">
          <div id="checkin-form" className="scroll-mt-20">
            <Card className="mx-auto max-w-3xl shadow-xl">
              <div className="mb-6 text-center">
                <h2 className="text-3xl font-bold text-primary">Log Your Activity</h2>
                <p className="mt-2 text-slate-600 dark:text-slate-300">Upload a photo and details from your volunteer activity</p>
              </div>

              {success && (
                <div className="mb-6 rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 px-4 py-3 text-center text-green-700 dark:text-green-400">
                  <p className="font-semibold">{success}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Photo Upload */}
                <div>
                  <label className="mb-3 block text-center text-sm font-semibold text-slate-700 dark:text-slate-200">
                    <Camera className="mr-1 inline" size={18} />
                    Upload Activity Photo (Optional)
                  </label>
                  {previewImage ? (
                    <div className="relative">
                      <img 
                        src={previewImage} 
                        alt="Preview" 
                        className="h-80 w-full rounded-xl object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewImage(null);
                          setCheckInData({ ...checkInData, photo: null });
                        }}
                        className="absolute right-3 top-3 rounded-full bg-red-600 p-2 text-white shadow-lg hover:bg-red-700"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <label className="flex h-80 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 transition hover:border-primary/50 hover:bg-primary/10 dark:border-primary/40 dark:bg-primary/10">
                      <div className="rounded-full bg-primary/10 p-6">
                        <Upload size={48} className="text-primary" />
                      </div>
                      <p className="mt-4 text-lg font-semibold text-primary">Click to upload activity photo</p>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Upload a selfie from your volunteer activity</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Activity Type *</label>
                    <select
                      name="activity"
                      value={checkInData.activity}
                      onChange={handleChange}
                      className={FORM_INPUT}
                      required
                    >
                      <option value="">Select Activity</option>
                      <option value="Food Distribution">Food Distribution</option>
                      <option value="Healthcare Camp">Healthcare Camp</option>
                      <option value="Education Support">Education Support</option>
                      <option value="Skill Training">Skill Training</option>
                      <option value="Community Cleanup">Community Cleanup</option>
                      <option value="Awareness Drive">Awareness Drive</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Location *</label>
                    <input
                      type="text"
                      name="location"
                      value={checkInData.location}
                      onChange={handleChange}
                      placeholder="City/Village name"
                      className={FORM_INPUT}
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Campaign / Drive Name (Optional)</label>
                    <input
                      type="text"
                      name="campaign"
                      value={checkInData.campaign}
                      onChange={handleChange}
                      placeholder="e.g. Diwali Food Drive 2026"
                      className={FORM_INPUT}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Beneficiaries Served *</label>
                    <input
                      type="number"
                      name="beneficiaries"
                      value={checkInData.beneficiaries}
                      onChange={handleChange}
                      placeholder="Number of people"
                      min="1"
                      className={FORM_INPUT}
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Hours Volunteered *</label>
                    <input
                      type="number"
                      name="hours"
                      value={checkInData.hours}
                      onChange={handleChange}
                      placeholder="Hours (e.g., 2.5)"
                      min="0.5"
                      step="0.5"
                      className={FORM_INPUT}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Notes (Optional)</label>
                  <textarea
                    name="notes"
                    value={checkInData.notes}
                    onChange={handleChange}
                    placeholder="Share your experience..."
                    rows={3}
                    className={FORM_INPUT}
                  />
                </div>

                <Button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 py-4 text-lg"
                >
                  <Camera size={22} />
                  Submit Check-In
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}

export default CheckInPage;
