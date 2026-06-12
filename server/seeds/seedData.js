import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Doctor from '../models/Doctor.js';
import Disease from '../models/Disease.js';
import connectDB from '../config/db.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Doctor.deleteMany();
    await Disease.deleteMany();

    const users = [
      { name: 'Admin User', email: 'admin@smartdoc.com', password: 'password123', role: 'admin' },
      { name: 'Dr. Robert Chen', email: 'chen@smartdoc.com', password: 'password123', role: 'doctor' },
      { name: 'Dr. Sarah Jenkins', email: 'jenkins@smartdoc.com', password: 'password123', role: 'doctor' },
      { name: 'Dr. Alice Peterson', email: 'peterson@smartdoc.com', password: 'password123', role: 'doctor' },
      { name: 'Dr. David Patel', email: 'patel@smartdoc.com', password: 'password123', role: 'doctor' },
      { name: 'Dr. Emily Taylor', email: 'taylor@smartdoc.com', password: 'password123', role: 'doctor' },
      { name: 'John Doe', email: 'john@example.com', password: 'password123', role: 'patient' }
    ];

    const createdUsers = [];
    for (const user of users) {
      const createdUser = await User.create(user);
      createdUsers.push(createdUser);
    }

    // Doctors profiles mapping to the created doctor users
    const doctorsData = [
      {
        userId: createdUsers[1]._id,
        specialization: 'cardiology',
        experience: 12,
        qualifications: ['MBBS', 'MD - Cardiology', 'FACC'],
        bio: 'Senior Cardiologist specializing in interventional cardiology and preventative heart care.',
        fees: 180,
        hospital: 'Metro Heart Institute',
        rating: 4.9,
        numReviews: 142,
      },
      {
        userId: createdUsers[2]._id,
        specialization: 'dermatology',
        experience: 8,
        qualifications: ['MBBS', 'MD - Dermatology'],
        bio: 'Expert dermatologist specializing in skincare, clinical dermatology, and cosmetic treatments.',
        fees: 130,
        hospital: 'Radiant Skin Clinic',
        rating: 4.7,
        numReviews: 98,
      },
      {
        userId: createdUsers[3]._id,
        specialization: 'neurology',
        experience: 15,
        qualifications: ['MBBS', 'DM - Neurology'],
        bio: 'Consultant Neurologist focused on headache management, stroke care, and neuromuscular disorders.',
        fees: 200,
        hospital: 'Neuro Care Center',
        rating: 4.8,
        numReviews: 115,
      },
      {
        userId: createdUsers[4]._id,
        specialization: 'pediatrics',
        experience: 9,
        qualifications: ['MBBS', 'DCH - Pediatrics'],
        bio: 'Dedicated pediatrician providing comprehensive newborn, child development, and immunization care.',
        fees: 110,
        hospital: 'Childrens Health Hospital',
        rating: 4.9,
        numReviews: 134,
      },
      {
        userId: createdUsers[5]._id,
        specialization: 'orthopedics',
        experience: 11,
        qualifications: ['MBBS', 'MS - Orthopedics'],
        bio: 'Specialist orthopedic surgeon expert in sports medicine, joint replacement, and fracture care.',
        fees: 150,
        hospital: 'Joint & Bone Care Clinic',
        rating: 4.6,
        numReviews: 86,
      }
    ];

    for (const doc of doctorsData) {
      await Doctor.create(doc);
    }

    const diseasesData = [
      {
        name: 'Hypertension',
        category: 'Cardiovascular',
        severity: 'Moderate',
        symptoms: ['Headaches', 'Shortness of breath', 'Nosebleeds', 'Dizziness'],
        causes: ['High salt diet', 'Stress', 'Genetics', 'Lack of exercise'],
        prevention: ['Reduce salt intake', 'Regular exercise', 'Manage stress', 'Limit alcohol'],
        treatments: ['Antihypertensive medication', 'Dietary changes', 'Weight loss'],
        overview: 'Hypertension (high blood pressure) is a common cardiovascular condition where the long-term force of blood against artery walls is high enough that it may cause heart diseases or stroke.'
      },
      {
        name: 'Type 2 Diabetes',
        category: 'Endocrine',
        severity: 'Moderate',
        symptoms: ['Increased thirst', 'Frequent urination', 'Fatigue', 'Blurry vision'],
        causes: ['Insulin resistance', 'Obesity', 'Physical inactivity', 'Genetics'],
        prevention: ['Balanced diet', 'Maintain healthy weight', 'Active lifestyle'],
        treatments: ['Metformin medication', 'Insulin therapy', 'Diet and glucose monitoring'],
        overview: 'Type 2 Diabetes is a chronic endocrine condition that affects the way the body metabolizes glucose (sugar), resulting in elevated blood sugar levels.'
      },
      {
        name: 'Asthma',
        category: 'Respiratory',
        severity: 'Moderate',
        symptoms: ['Wheezing', 'Shortness of breath', 'Chest tightness', 'Coughing'],
        causes: ['Airborne allergens', 'Respiratory infections', 'Cold air', 'Genetics'],
        prevention: ['Avoid allergy triggers', 'Get vaccinated', 'Monitor breathing patterns'],
        treatments: ['Inhalers (bronchodilators)', 'Inhaled corticosteroids', 'Nebulizers'],
        overview: 'Asthma is a chronic respiratory condition characterized by inflammation and narrowing of the airways, which makes breathing difficult.'
      },
      {
        name: 'Migraine',
        category: 'Neurological',
        severity: 'Severe',
        symptoms: ['Throbbing pain', 'Nausea', 'Light sensitivity', 'Sound sensitivity'],
        causes: ['Hormonal changes', 'Stress', 'Certain foods', 'Sleep disruption'],
        prevention: ['Keep headache diary', 'Manage stress', 'Maintain regular sleep/eating patterns'],
        treatments: ['Pain relievers', 'Triptans', 'Preventative medications'],
        overview: 'Migraine is a severe neurological condition characterized by intense, throbbing headaches, often accompanied by visual disturbances and sensory sensitivity.'
      },
      {
        name: 'Osteoarthritis',
        category: 'Musculoskeletal',
        severity: 'Moderate',
        symptoms: ['Joint pain', 'Stiffness', 'Loss of flexibility', 'Grating sensation'],
        causes: ['Joint wear and tear', 'Aging', 'Obesity', 'Joint injuries'],
        prevention: ['Maintain healthy weight', 'Low-impact exercise', 'Avoid joint overuse'],
        treatments: ['Physical therapy', 'Pain management', 'Joint replacement surgery'],
        overview: 'Osteoarthritis is a degenerative musculoskeletal condition where the protective cartilage that cushions the ends of bones wears down over time, causing joint pain.'
      }
    ];

    for (const disease of diseasesData) {
      await Disease.create(disease);
    }

    console.log('Data Imported successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error with seeding data: ${error}`);
    process.exit(1);
  }
};

importData();
