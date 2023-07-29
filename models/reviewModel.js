const mongoose = require('mongoose');
const Tour = require('./tourModel');
const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, 'Review can not be empty!']
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tour',
    required: [true, 'Review must belong to a tour.']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Review must belong to a User ']
  }
});

reviewSchema.index({ tour: 1, user: 1 }, { unique: true });
reviewSchema.statics.calcAverageRatings = async function(tourId) {
  const stats = await this.aggregate([
    {
      $match: { tour: tourId }
    },
    {
      $group: {
        _id: '$tour',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' }
      }
    }
  ]);

  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating
    });
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5
    });
  }
};

reviewSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: 'name photo'
  });
  next();
});

reviewSchema.post('save', function() {
  this.constructor.calcAverageRatings(this.tour);
});

reviewSchema.pre(/^findOneAnd/, async function(next) {
  this.r = await this.findOne();
  next();
});

reviewSchema.post(/^findOneAnd/, async function() {
  await this.r.constructor.calcAverageRatings(this.r.tour);
});
const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;

/*
index --> 
1- بستخدمه عشان احسن الاداء بتاع تنفيذ المونجو كويري

2- لو ما استخدمتهوش لو جيت اعمل اي كويري زي فايند مثلا بضطر اني امشي علي كل الدوكومينت داخل الكوليكشن 

3- اما بستخدمه بيرتب ليا الفيلديس تصاعدي او تنازلي
يعني لو بعمل كويري مثلا في كوليشكن علي الدوكمينت اللي الاسعارفيها اكبر من 100 فهو بيرتب الاسعار دي تنازلي او تصاعدي حسب اللي انت بتحدده 

4- تخيل انك عنك صندوق في لعب وانت عاوز توصل للعربيه اللي لونها احمر فواحد قام مساعدك ومديك ليست كده فيها الالعاب والوانها عشان توصل اسرع للعربيه كذلك الاندكس في ال مونجو 

الكوليكشن عامل زي البوكس الكبير اللي في لعب 
الدكومينت عامل زي الالعاب اللي موجوده داخل البوكس

لما اعوز ادور علي دوكمينت معين بيطابق بعد الشروط المعينه فانا بستخدم الاندكس عشان توصلني للدكومينت بطريقه اسرع زي ما كنت بدور علي العربيه الحمرا داخل صندوق اللعب فاستخدمت الليست

5- 

*/
