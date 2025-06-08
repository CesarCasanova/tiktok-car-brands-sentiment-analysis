import {LoadingSpinner} from "@/components/LoadingSpinner";

const TopVideosChart = ({ data, isLoading }) => {
  const topVideos = data
    .sort((a, b) => b.views - a.views).slice(0, 5);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Top Performing Videos</h3>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
      <ul className="space-y-2">
        {topVideos.map((item, index) => (
          <li
            key={index}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
          >
            <div className="flex items-center">

              <span
                className='text-gray-500'
              >
                  <a href={item.tiktokLink} target='_blank'>{item.tiktokLink}</a>
              </span>
            </div>
            <div
              className="ml-4 px-2 py-1 text-red-600 hover:bg-red-100 rounded text-sm"
            >
              {item.views} views
            </div>
          </li>
        ))}
      </ul>
      )}
    </div>
  );
};

export default TopVideosChart;