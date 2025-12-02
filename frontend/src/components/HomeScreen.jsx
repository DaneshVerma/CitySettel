import { useState, useEffect } from "react";
import {
  Search,
  Home,
  UtensilsCrossed,
  Dumbbell,
  Package,
  Heart,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { comboAPI } from "../api/combo";
import { useAuth } from "../contexts/AuthContext";

const categories = [
  { id: "accommodation", icon: Home, label: "Accommodation", color: "#2563EB" },
  { id: "food", icon: UtensilsCrossed, label: "Food", color: "#16A34A" },
  { id: "gym", icon: Dumbbell, label: "Gym", color: "#8B5CF6" },
  { id: "essentials", icon: Package, label: "Essentials", color: "#F59E0B" },
];

export function HomeScreen({ onNavigate }) {
  const [combos, setCombos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchCombos();
  }, []);

  const fetchCombos = async () => {
    try {
      const data = await comboAPI.getCombos({ limit: 6 });
      setCombos(data.combos || []);
    } catch (error) {
      console.error("Error fetching combos:", error);
      // Use fallback data if API fails
      setCombos([
        {
          _id: "1",
          title: "Student Starter Pack",
          description: "PG Stay + Daily Meals + Gym",
          price: 9800,
          image:
            "https://images.unsplash.com/photo-1549881567-c622c1080d78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwaG9zdGVsJTIwcm9vbXxlbnwxfHx8fDE3NjA5MDE2MjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
          badge: "Popular",
        },
        {
          _id: "2",
          title: "Professional Essentials",
          description: "1BHK + Meals + Fitness Center",
          price: 15500,
          image:
            "https://images.unsplash.com/photo-1603072845032-7b5bd641a82a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBsaXZpbmd8ZW58MXx8fHwxNzYwOTMwMjQ3fDA&ixlib=rb-4.1.0&q=80&w=1080",
          badge: "Best Value",
        },
        {
          _id: "3",
          title: "Budget Friendly",
          description: "Shared Room + Tiffin Service",
          price: 6500,
          image:
            "https://images.unsplash.com/photo-1641301547846-2cf73f58fdca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwZm9vZCUyMG1lYWx8ZW58MXx8fHwxNzYwODQ4NDQzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className='min-h-screen bg-[#F9FAFB] pb-20'>
      {/* Header */}
      <div className='bg-white px-6 pt-6 pb-4 rounded-b-3xl shadow-sm'>
        <div className='flex items-center justify-between mb-4'>
          <div>
            <p className='text-[#6B7280]'>Welcome back,</p>
            <h1 className='text-2xl text-[#111827]'>
              Hi, {user?.fullName?.firstName || "Guest"} 👋
            </h1>
          </div>
          <div className='w-12 h-12 bg-gradient-to-br from-[#2563EB] to-[#1E40AF] rounded-full flex items-center justify-center shadow-md'>
            <span className='text-white'>
              {user?.fullName?.firstName?.charAt(0) || "G"}
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className='relative'>
          <Search className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]' />
          <input
            type='text'
            placeholder='Search city, area, or service...'
            className='w-full pl-12 pr-4 h-12 rounded-xl bg-[#F3F4F6] border border-transparent focus:border-[#2563EB] focus:bg-white focus:outline-none transition-all'
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className='px-6 mt-6'>
        <h2 className='text-[#111827] mb-4'>Browse by Category</h2>
        <div className='grid grid-cols-2 gap-3'>
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => onNavigate("explore", { category: category.id })}
                className='bg-white rounded-xl p-4 flex flex-col items-center justify-center h-28 shadow-sm hover:shadow-md transition-shadow'
              >
                <div
                  className='w-12 h-12 rounded-full flex items-center justify-center mb-2'
                  style={{ backgroundColor: `${category.color}15` }}
                >
                  <Icon className='w-6 h-6' style={{ color: category.color }} />
                </div>
                <span className='text-[#111827]'>{category.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Smart Combos */}
      <div className='mt-8'>
        <div className='px-6 flex items-center justify-between mb-4'>
          <h2 className='text-[#111827]'>Smart Combos for You</h2>
          <button className='text-[#2563EB]'>See all</button>
        </div>

        <div className='flex gap-4 px-6 overflow-x-auto pb-2 scrollbar-hide'>
          {loading ? (
            <p className='text-[#6B7280]'>Loading combos...</p>
          ) : combos.length === 0 ? (
            <p className='text-[#6B7280]'>No combos available</p>
          ) : (
            combos.map((combo) => (
              <button
                key={combo._id || combo.id}
                onClick={() => onNavigate("combo", combo)}
                className='flex-shrink-0 w-64 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow'
              >
                <div className='relative h-36'>
                  <ImageWithFallback
                    src={combo.image}
                    alt={combo.title}
                    className='w-full h-full object-cover'
                  />
                  {combo.badge && (
                    <div className='absolute top-3 left-3 bg-[#16A34A] text-white px-3 py-1 rounded-full text-sm'>
                      {combo.badge}
                    </div>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className='absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md'
                  >
                    <Heart className='w-4 h-4 text-[#6B7280]' />
                  </button>
                </div>

                <div className='p-4'>
                  <h3 className='text-[#111827] mb-1'>{combo.title}</h3>
                  <p className='text-sm text-[#6B7280] mb-3'>
                    {combo.description}
                  </p>
                  <div className='flex items-center justify-between'>
                    <div>
                      <span className='text-[#2563EB]'>
                        ₹{combo.price.toLocaleString()}
                      </span>
                      <span className='text-[#6B7280] text-sm'>/month</span>
                    </div>
                    <span className='text-[#2563EB] text-sm'>
                      View Details →
                    </span>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className='px-6 mt-8'>
        <div className='bg-gradient-to-br from-[#2563EB] to-[#1E40AF] rounded-xl p-6 text-white'>
          <h3 className='mb-2'>Save up to 30%</h3>
          <p className='text-blue-100 text-sm mb-4'>
            Bundle your stay, food, and fitness for maximum savings!
          </p>
          <button className='bg-white text-[#2563EB] px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors'>
            Explore Combos
          </button>
        </div>
      </div>
    </div>
  );
}
