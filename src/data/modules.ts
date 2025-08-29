import { Module } from '@/types';

export const modules: Module[] = [
  {
    id: 'nutrition',
    title: 'Understanding Nutrition',
    description: 'Learn the fundamentals of balanced nutrition and healthy eating habits.',
    content: `
      <h3>What is Nutrition?</h3>
      <p>Nutrition is the science of how food affects your body and health. Understanding nutrition helps you make informed choices about what you eat.</p>
      
      <h3>Key Nutrients Your Body Needs:</h3>
      <ul>
        <li><strong>Carbohydrates:</strong> Your body's main energy source. Choose complex carbs like whole grains.</li>
        <li><strong>Proteins:</strong> Essential for muscle building and repair. Include lean meats, fish, beans, and nuts.</li>
        <li><strong>Fats:</strong> Important for brain function and hormone production. Focus on healthy fats from avocados, olive oil, and fish.</li>
        <li><strong>Vitamins & Minerals:</strong> Support various body functions. Get them from colorful fruits and vegetables.</li>
        <li><strong>Water:</strong> Vital for all body processes. Aim for 8-10 glasses daily.</li>
      </ul>
      
      <h3>Building a Balanced Plate:</h3>
      <p>Fill half your plate with vegetables and fruits, one quarter with lean protein, and one quarter with whole grains.</p>
    `,
    quiz: {
      questions: [
        {
          id: 'q1',
          question: 'What should make up half of your balanced plate?',
          options: ['Proteins', 'Carbohydrates', 'Vegetables and fruits', 'Fats'],
          correctAnswer: 2,
          explanation: 'Vegetables and fruits should fill half your plate as they provide essential vitamins, minerals, and fiber.'
        },
        {
          id: 'q2',
          question: 'Which type of fats should you focus on for brain health?',
          options: ['Trans fats', 'Saturated fats', 'Healthy fats from fish and avocados', 'Any type of fat'],
          correctAnswer: 2,
          explanation: 'Healthy fats like omega-3s from fish and monounsaturated fats from avocados support brain function.'
        },
        {
          id: 'q3',
          question: 'How much water should you aim to drink daily?',
          options: ['2-3 glasses', '4-5 glasses', '8-10 glasses', '15+ glasses'],
          correctAnswer: 2,
          explanation: '8-10 glasses of water daily helps maintain proper hydration for all body functions.'
        }
      ]
    },
    icon: 'Apple',
    color: 'text-green-600'
  },
  {
    id: 'physical-activity',
    title: 'Physical Activity',
    description: 'Discover the importance of regular exercise and how to build an active lifestyle.',
    content: `
      <h3>Why Physical Activity Matters</h3>
      <p>Regular physical activity is crucial for maintaining a healthy weight, building strong bones and muscles, and improving mental health.</p>
      
      <h3>Benefits of Regular Exercise:</h3>
      <ul>
        <li><strong>Weight Management:</strong> Burns calories and builds muscle</li>
        <li><strong>Mental Health:</strong> Reduces stress, anxiety, and depression</li>
        <li><strong>Heart Health:</strong> Strengthens your cardiovascular system</li>
        <li><strong>Bone Strength:</strong> Prevents bone loss and osteoporosis</li>
        <li><strong>Better Sleep:</strong> Improves sleep quality and duration</li>
      </ul>
      
      <h3>How Much Exercise Do You Need?</h3>
      <p>Aim for at least 150 minutes of moderate-intensity exercise per week, or 75 minutes of vigorous-intensity exercise.</p>
      
      <h3>Types of Exercise:</h3>
      <ul>
        <li><strong>Cardio:</strong> Running, cycling, swimming</li>
        <li><strong>Strength Training:</strong> Weight lifting, resistance exercises</li>
        <li><strong>Flexibility:</strong> Stretching, yoga</li>
        <li><strong>Balance:</strong> Tai chi, balance exercises</li>
      </ul>
    `,
    quiz: {
      questions: [
        {
          id: 'q1',
          question: 'How many minutes of moderate-intensity exercise should you aim for per week?',
          options: ['75 minutes', '100 minutes', '150 minutes', '300 minutes'],
          correctAnswer: 2,
          explanation: '150 minutes of moderate-intensity exercise per week is the recommended amount for adults.'
        },
        {
          id: 'q2',
          question: 'Which is NOT a benefit of regular exercise?',
          options: ['Better sleep', 'Increased stress', 'Stronger bones', 'Better heart health'],
          correctAnswer: 1,
          explanation: 'Exercise actually reduces stress, not increases it. It helps manage stress and improve mental health.'
        }
      ]
    },
    icon: 'Dumbbell',
    color: 'text-blue-600'
  },
  {
    id: 'sugar-salt-awareness',
    title: 'Sugar & Salt Awareness',
    description: 'Learn about hidden sugars and sodium in foods and how to make healthier choices.',
    content: `
      <h3>The Hidden Sugar Problem</h3>
      <p>Many processed foods contain hidden sugars that can contribute to weight gain and health problems.</p>
      
      <h3>Common Sources of Hidden Sugar:</h3>
      <ul>
        <li>Soft drinks and energy drinks</li>
        <li>Breakfast cereals</li>
        <li>Yogurt with added fruit</li>
        <li>Salad dressings and sauces</li>
        <li>Processed snacks</li>
      </ul>
      
      <h3>Understanding Sodium</h3>
      <p>Too much sodium can lead to high blood pressure and other health issues. Most sodium comes from processed foods, not the salt shaker.</p>
      
      <h3>Tips for Reducing Sugar and Salt:</h3>
      <ul>
        <li>Read nutrition labels carefully</li>
        <li>Choose whole, unprocessed foods</li>
        <li>Cook more meals at home</li>
        <li>Use herbs and spices for flavor instead of salt</li>
        <li>Drink water instead of sugary beverages</li>
      </ul>
    `,
    quiz: {
      questions: [
        {
          id: 'q1',
          question: 'Where does most of our daily sodium intake come from?',
          options: ['Salt added during cooking', 'Salt from the salt shaker', 'Processed foods', 'Natural foods'],
          correctAnswer: 2,
          explanation: 'Most sodium in our diet comes from processed and restaurant foods, not from salt we add ourselves.'
        },
        {
          id: 'q2',
          question: 'Which drink is the healthiest choice for reducing sugar intake?',
          options: ['Fruit juice', 'Sports drinks', 'Water', 'Diet soda'],
          correctAnswer: 2,
          explanation: 'Water is the healthiest choice as it contains no added sugars or artificial sweeteners.'
        }
      ]
    },
    icon: 'AlertTriangle',
    color: 'text-orange-600'
  },
  {
    id: 'healthy-habits',
    title: 'Building Healthy Habits',
    description: 'Learn strategies for creating and maintaining healthy lifestyle habits.',
    content: `
      <h3>The Science of Habit Formation</h3>
      <p>Habits are automatic behaviors that help us navigate daily life efficiently. Building healthy habits takes time but becomes easier with practice.</p>
      
      <h3>The Habit Loop:</h3>
      <ul>
        <li><strong>Cue:</strong> The trigger that starts the behavior</li>
        <li><strong>Routine:</strong> The behavior itself</li>
        <li><strong>Reward:</strong> The benefit you get from the behavior</li>
      </ul>
      
      <h3>Strategies for Building Healthy Habits:</h3>
      <ul>
        <li><strong>Start Small:</strong> Begin with tiny changes you can easily maintain</li>
        <li><strong>Stack Habits:</strong> Link new habits to existing ones</li>
        <li><strong>Track Progress:</strong> Keep a record of your habit performance</li>
        <li><strong>Be Patient:</strong> It takes 21-66 days to form a new habit</li>
        <li><strong>Plan for Obstacles:</strong> Think ahead about potential challenges</li>
      </ul>
      
      <h3>Examples of Healthy Habits:</h3>
      <ul>
        <li>Drinking a glass of water upon waking</li>
        <li>Taking a 10-minute walk after lunch</li>
        <li>Eating a piece of fruit as an afternoon snack</li>
        <li>Going to bed at the same time each night</li>
      </ul>
    `,
    quiz: {
      questions: [
        {
          id: 'q1',
          question: 'How long does it typically take to form a new habit?',
          options: ['7-14 days', '21-66 days', '3-6 months', '1 year'],
          correctAnswer: 1,
          explanation: 'Research shows it takes an average of 21-66 days to form a new habit, depending on the complexity.'
        },
        {
          id: 'q2',
          question: 'What is the best way to start building a new healthy habit?',
          options: ['Make big changes immediately', 'Start small with manageable changes', 'Wait for motivation', 'Change everything at once'],
          correctAnswer: 1,
          explanation: 'Starting small with manageable changes increases your chances of success and helps build momentum.'
        }
      ]
    },
    icon: 'Target',
    color: 'text-purple-600'
  },
  {
    id: 'understanding-obesity',
    title: 'Understanding Obesity',
    description: 'Learn about obesity causes, risks, and evidence-based prevention strategies.',
    content: `
      <h3>What is Obesity?</h3>
      <p>Obesity is a complex health condition characterized by excess body fat that may increase the risk of health problems.</p>
      
      <h3>Measuring Obesity:</h3>
      <ul>
        <li><strong>BMI (Body Mass Index):</strong> Weight in kg divided by height in meters squared</li>
        <li><strong>BMI Categories:</strong>
          <ul>
            <li>Underweight: Below 18.5</li>
            <li>Normal weight: 18.5-24.9</li>
            <li>Overweight: 25-29.9</li>
            <li>Obese: 30 and above</li>
          </ul>
        </li>
      </ul>
      
      <h3>Causes of Obesity:</h3>
      <ul>
        <li>Genetics and family history</li>
        <li>Poor diet and eating habits</li>
        <li>Lack of physical activity</li>
        <li>Certain medications</li>
        <li>Sleep deprivation</li>
        <li>Stress and emotional factors</li>
      </ul>
      
      <h3>Health Risks Associated with Obesity:</h3>
      <ul>
        <li>Type 2 diabetes</li>
        <li>Heart disease</li>
        <li>High blood pressure</li>
        <li>Sleep apnea</li>
        <li>Certain types of cancer</li>
      </ul>
      
      <h3>Prevention Strategies:</h3>
      <ul>
        <li>Maintain a balanced diet</li>
        <li>Stay physically active</li>
        <li>Get adequate sleep</li>
        <li>Manage stress effectively</li>
        <li>Monitor your weight regularly</li>
      </ul>
    `,
    quiz: {
      questions: [
        {
          id: 'q1',
          question: 'A BMI of 27 would be classified as:',
          options: ['Underweight', 'Normal weight', 'Overweight', 'Obese'],
          correctAnswer: 2,
          explanation: 'A BMI of 27 falls in the overweight category (25-29.9).'
        },
        {
          id: 'q2',
          question: 'Which is NOT typically considered a major cause of obesity?',
          options: ['Genetics', 'Poor diet', 'Eye color', 'Lack of exercise'],
          correctAnswer: 2,
          explanation: 'Eye color is not related to obesity. Genetics, poor diet, and lack of exercise are major contributing factors.'
        },
        {
          id: 'q3',
          question: 'Which health condition is commonly associated with obesity?',
          options: ['Perfect vision', 'Type 2 diabetes', 'Increased height', 'Better memory'],
          correctAnswer: 1,
          explanation: 'Type 2 diabetes is strongly associated with obesity and is a common health risk.'
        }
      ]
    },
    icon: 'Heart',
    color: 'text-red-600'
  }
];