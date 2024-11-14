import gplay from "google-play-scraper"; // Importing the module
import Sentiment from "sentiment"; // Importing sentiment analysis package

// Controller to fetch reviews and analyze sentiment
const getReviews = async (req, res) => {
  try {
    const { appName } = req.body; // Extract appName from the request body

    // Check if appName is provided
    if (!appName) {
      return res.status(400).json({
        statusCode: 400,
        data: null,
        success: false,
        errors: ["App name is required"],
      });
    }

    // Search for the app using google-play-scraper to get the appId
    const searchResults = await gplay.search({
      term: appName, // Search term (app name)
      num: 1, // Limit to first result
      lang: "en", // Language (optional)
    });

    // Check if app was found
    if (searchResults.length === 0) {
      return res.status(404).json({
        statusCode: 404,
        data: null,
        success: false,
        errors: ["App not found"],
      });
    }

    // Get the appId from the search result
    const appId = searchResults[0].appId; // The app ID (package name)

    // Fetch reviews using google-play-scraper
    const reviews = await gplay.reviews({
      appId: appId, // The app ID
      num: 1000, // Number of reviews to fetch
      sort: gplay.sort.NEWEST, // Sorting by newest reviews
    });

    // Initialize the sentiment analyzer
    const sentiment = new Sentiment();

    // Classify the reviews
    const reviewsWithSentiment = reviews.data.map((review) => {
      const analysis = sentiment.analyze(review.text); // Analyze review text
      return {
        text: review.text,
        sentiment: analysis.score >= 0 ? "Positive" : "Negative", // Categorize sentiment
      };
    });

    // Separate positive and negative reviews
    const positiveReviews = reviewsWithSentiment.filter(
      (review) => review.sentiment === "Positive"
    );
    const negativeReviews = reviewsWithSentiment.filter(
      (review) => review.sentiment === "Negative"
    );

    // Return the reviews with sentiment classification
    res.status(200).json({
      statusCode: 200,
      data: { positiveReviews, negativeReviews },
      success: true,
      errors: [],
    });
  } catch (error) {
    console.error("Error fetching reviews:", error.message, error.stack);

    // Return an error response if there is an issue
    res.status(500).json({
      statusCode: 500,
      data: null,
      success: false,
      errors: [error.message || "Error fetching reviews"],
    });
  }
};

export { getReviews };
