import { 
  Activity, 
  Brain, 
  Heart, 
  Stethoscope, 
  Pill, 
  Syringe, 
  Scale,
  Microscope,
  Sparkles
} from 'lucide-react';

export const categories = [
  { 
    id: 1, 
    title: 'Obesity & Nutrition', 
    icon: Scale,
    tools: ['BMI Calculator', 'Nutrition Assessment']
  },
  { 
    id: 2, 
    title: 'Diabetes Diagnosis & Classification', 
    icon: Activity,
    tools: ['Diabetes Type Classification', 'HbA1c Analysis']
  },
  { 
    id: 3, 
    title: 'MASLD', 
    icon: Microscope,
    tools: ['FIB-4 Calculator', 'MASLD Assessment']
  },
  { 
    id: 4, 
    title: 'Diabetic Kidney Disease', 
    icon: Stethoscope,
    tools: ['eGFR Calculator', 'UACR Analysis']
  },
  { 
    id: 5, 
    title: 'Cardiovascular', 
    icon: Heart,
    tools: ['CV Risk Assessment', 'Statin Advisor']
  },
  { 
    id: 6, 
    title: 'Oral Antidiabetics', 
    icon: Pill,
    tools: ['Medication Selector', 'Dose Calculator']
  },
  { 
    id: 7, 
    title: 'Insulin', 
    icon: Syringe,
    tools: ['Insulin Calculator', 'Dose Adjustment']
  },
  { 
    id: 8, 
    title: 'Neurology', 
    icon: Brain,
    tools: ['Neuropathy Assessment', 'Cognitive Screening']
  },
  { 
    id: 9, 
    title: 'AI Based Tools', 
    icon: Sparkles,
    tools: ['Treatment Optimizer', 'Risk Predictor']
  }
] as const;