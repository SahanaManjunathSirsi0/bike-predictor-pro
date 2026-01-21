import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Chatbot from "@/components/Chatbot";
import { Star, User, Quote, Send, ThumbsUp, ThumbsDown } from "lucide-react";

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  avatar: string;
}

interface ReviewPageProps {
  onLogout: () => void;
}

const ReviewPage = ({ onLogout }: ReviewPageProps) => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      name: "Priya Sharma",
      rating: 5,
      comment: "Amazing hourly prediction accuracy! The weather integration makes it super practical for fleet management.",
      date: "Jan 15, 2026",
      helpful: 12,
      avatar: "👩‍💼"
    },
    {
      id: 2,
      name: "Rohan Patil",
      rating: 4,
      comment: "Great UI and intuitive sliders. Would love export to PDF feature for presentations.",
      date: "Jan 18, 2026",
      helpful: 8,
      avatar: "👨‍💻"
    },
    {
      id: 3,
      name: "Anjali Desai",
      rating: 5,
      comment: "Perfect for hackathons! The glassmorphism design impressed judges. Working day/weekend toggle is genius.",
      date: "Jan 19, 2026",
      helpful: 15,
      avatar: "👩‍🎓"
    }
  ]);

  const [formData, setFormData] = useState({
    name: "",
    rating: 0,
    comment: ""
  });
  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const submitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.comment || formData.rating === 0) return;

    const newReview: Review = {
      id: Date.now(),
      name: formData.name,
      rating: formData.rating,
      comment: formData.comment,
      date: new Date().toLocaleDateString("en-US", { 
        month: "short", 
        day: "numeric", 
        year: "numeric" 
      }),
      helpful: 0,
      avatar: "👤"
    };

    setReviews([newReview, ...reviews]);
    setFormData({ name: "", rating: 0, comment: "" });
    setShowForm(false);
  };

  const toggleHelpful = (reviewId: number) => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId 
        ? { ...review, helpful: review.helpful + 1 }
        : review
    ));
  };

  const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  const totalReviews = reviews.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <Navbar onLogout={onLogout} />
      
      <main className="container mx-auto px-4 py-8 pb-24">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-3 bg-primary/10 p-4 rounded-2xl mb-6">
            <Star className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-tight">
                User Reviews
              </h1>
              <p className="text-2xl font-bold text-foreground mt-1">
                {averageRating.toFixed(1)} / 5 ({totalReviews} reviews)
              </p>
            </div>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Share your experience with our AI demand forecasting platform
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Add Review Form */}
          <div className="lg:col-span-1">
            <div className="glass-card rounded-3xl p-8 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <Quote className="w-7 h-7 text-primary" />
                  Write Review
                </h2>
                <button
                  onClick={() => setShowForm(!showForm)}
                  className="p-2 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary transition-all"
                >
                  {showForm ? "✕" : "+"}
                </button>
              </div>

              {showForm && (
                <form onSubmit={submitReview} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Name</label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full glass-card p-3 rounded-xl text-foreground"
                      placeholder="Your name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Rating</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-8 h-8 cursor-pointer transition-all ${
                            star <= formData.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-muted-foreground"
                          }`}
                          onClick={() => handleRatingClick(star)}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Review</label>
                    <textarea
                      name="comment"
                      value={formData.comment}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full glass-card p-3 rounded-xl text-foreground resize-none"
                      placeholder="Share your experience..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full glass-card hover:glass-card-hover p-4 rounded-2xl font-bold bg-gradient-to-r from-primary to-secondary text-background transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Submit Review
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-2 space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="glass-card rounded-2xl p-8 hover:shadow-2xl transition-all animate-slide-up">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-2xl font-bold">
                    {review.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg truncate">{review.name}</h3>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= review.rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.date}</p>
                  </div>
                </div>

                <p className="text-lg leading-relaxed mb-6 text-foreground/90">{review.comment}</p>

                <div className="flex items-center gap-4 pt-4 border-t border-muted/30">
                  <button
                    onClick={() => toggleHelpful(review.id)}
                    className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    Helpful ({review.helpful})
                  </button>
                  <button className="text-sm text-muted-foreground hover:text-destructive transition-colors">
                    Reply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Chatbot 
        context={{
          page: "User Reviews",
          totalReviews,
          averageRating: averageRating.toFixed(1),
          instruction: "Help users understand review system and demand forecasting feedback"
        }} 
      />
    </div>
  );
};

export default ReviewPage;
