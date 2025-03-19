"use client";
import { useEffect, useState } from "react";

interface Activity {
  type: string;
  title: string;
  timestamp: number;
}

export default function Activites() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchActivities = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/activities");
        if (!response.ok) {
          throw new Error("Failed to fetch activities");
        }
        const data = await response.json();
        console.log(data.activities);
        setActivities(data.activities);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div className="bg-teal rounded-2xl">
      <h3 className="font-bold mb-2 text-center text-[#00003c]">
        Latest Activities
      </h3>
      {isLoading ? (
        <p>...</p>
      ) : (
        <ul className="space-y-1 text-sm text-center">
          {activities.length > 0 ? (
            activities.map((activity, index) => {
              const timestamp = new Date(activity.timestamp);
              const formattedTimestamp = timestamp.toLocaleString("en-US", {
                month: "numeric",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
              });
              if (activity.type === "removed") {
                return null;
              }
              const message =
                activity.type === "favorite" ? `Favorited` : `Added`;
              return (
                <li key={index} className="text-[#00003c]">
                  <p>{formattedTimestamp}</p> - {message}{" "}
                  <p className="font-bold">{activity.title}</p> to{" "}
                  {activity.type === "favorite" ? "Favorites" : "Watch Later"}
                </li>
              );
            })
          ) : (
            <li className="text-gray-500">No recent activities</li>
          )}
        </ul>
      )}
    </div>
  );
}
