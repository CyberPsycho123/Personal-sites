import express from 'express'
import cors from 'cors'
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import { Admins } from './models/Admins.js';
import { Certs } from './models/Certs.js';
import { Projects } from './models/Projects.js';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

dotenv.config();

const DB_URL = process.env.ATLAS_URL;

const app = express()
const port = process.env.PORT || 3000;



const allowedOrigins = [
  "https://personal-site-iota-kohl.vercel.app",
  "https://personal-sites-kappa.vercel.app" 
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.set("trust proxy", 1);
app.use(express.json());
app.use(cookieParser());

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

if (!DB_URL) {
  console.error("ATLAS_URL is undefined");
  process.exit(1);
}

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("Successfully connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

connectDB();

const secretKey = process.env.SECRET_KEY;



const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // 1. Identify if the file is a PDF
    const isPdf = file.mimetype === 'application/pdf';
    const isPhoto = file.mimetype.startsWith('image/');

    return {
      folder: 'personal',
      // 2. IMPORTANT: Use 'image' for PDFs so they are viewable
      resource_type: (isPdf || isPhoto) ? 'image' : 'raw',

      public_id: `${file.fieldname}-${Date.now()}`,

      // 3. IMPORTANT: Force the 'pdf' format so the URL ends in .pdf
      format: isPdf ? 'pdf' : undefined,

      // 4. Forces the browser to show the file "inline"
      content_disposition: 'inline',
    };
  },
});


const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "image") {
      if (!file.mimetype.startsWith("image/")) {
        return cb(new Error("Only image files allowed"), false);
      }
    }

    if (file.fieldname === "pdf") {
      if (file.mimetype !== "application/pdf") {
        return cb(new Error("Only PDF files allowed"), false);
      }
    }
    cb(null, true);
  },
});

app.get('/', (req, res) => {
  res.status(200).json({ status: "ok" })
})

app.post("/uploadcert", upload.fields([{ name: "image", maxCount: 1 }, { name: "pdf", maxCount: 1 }]), async (req, res) => {
  if (!req.files || !req.files.image) {
    return res.status(400).json({ success: false, message: "No image uploaded" });
  }
  const email = req.cookies.email
  if (email) {
    const { title, issuer, date } = req.body;
    const imageUrl = req.files.image[0].path;
    const pdfUrl = req.files.pdf[0].path;
    const saving = new Certs({ email: email, image: imageUrl, pdf: pdfUrl, title: title, provider: issuer, Date: date })
    await saving.save()
    res.json({ success: true });
  }
  else {
    res.json({ success: false });
  }

}
);


app.post("/uploadproject", upload.fields([{ name: "image", maxCount: 1 }]), async (req, res) => {
  if (!req.files || !req.files.image) {
    return res.status(400).json({ success: false, message: "No image uploaded" });
  }
  const email = req.cookies.email
  if (email) {
    const { title, desc, link } = req.body;
    const imageUrl = req.files.image[0].path;
    const saving = new Projects({ email: email, image: imageUrl, title: title, desc: desc, gitlink: link })
    await saving.save()
    res.json({ success: true });
  }
  else {
    res.json({ success: false });
  }

}
);


app.post('/readcerts', async (req, res) => {
  const emails = ['bilu02493@gmail.com']
  let list_of_certs = []
  for (let i = 0; i < emails.length; i++) {
    const email = emails[i]
    const certs = await Certs.find({ email })
    list_of_certs.push(certs)
  }
  const bilal_certs = list_of_certs[0] || []
  const britto_certs = list_of_certs[1] || []
  const abhishek_certs = list_of_certs[2] || []
  const devadath_certs = list_of_certs[3] || []
  const akash_certs = list_of_certs[4] || []
  const adhil_certs = list_of_certs[5] || []
  const vaishnav_certs = list_of_certs[6] || []
  const nidhin_certs = list_of_certs[7] || []
  const karthika_certs = list_of_certs[8] || []
  const athul_certs = list_of_certs[9] || []
  const hridhya_certs = list_of_certs[10] || []
  const joyal_certs = list_of_certs[11] || []
  res.json({ success: true, bilal: bilal_certs, britto: britto_certs, abhishek: abhishek_certs, devadath: devadath_certs, akash: akash_certs,adhil:adhil_certs,vaishnav:vaishnav_certs })
})

app.post('/readprojects', async (req, res) => {
  const emails = ['bilu02493@gmail.com']
  let list_of_projects = []
  for (let i = 0; i < emails.length; i++) {
    const email = emails[i]
    const projects = await Projects.find({ email })
    list_of_projects.push(projects)
  }
  const bilal_projects = list_of_projects[0] || []
  const britto_projects = list_of_projects[1] || []
  const abhishek_projects = list_of_projects[2] || []
  const devadath_projects = list_of_projects[3] || []
  const akash_projects = list_of_projects[4] || []
  const adhil_projects = list_of_projects[5] || []
  const vaishnav_projects = list_of_projects[6] || []
  res.json({ success: true, bilal: bilal_projects, britto: britto_projects, abhishek: abhishek_projects, devadath: devadath_projects, akash: akash_projects,adhil:adhil_projects,vaishnav:vaishnav_projects })
})


app.post('/login', async (req, res) => {
  const { email, password } = req.body
  const find_email = await Admins.findOne({ email })
  if (find_email) {
    if (find_email.password == password) {
      const token = jwt.sign({ email: email }, secretKey, { expiresIn: '7d' })
      res.cookie("token", token, { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true, secure: true, sameSite: "none" });
      res.cookie("email", email, { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true, secure: true, sameSite: "none" });
      res.json({ success: true })
    }
    else {
      res.json({ success: false })
    }
  }
  else {
    res.json({ success: false })
  }

})

app.post('/readcookie', (req, res) => {
  const email = req.cookies.email
  if (email) {
    res.json({ success: true })
  }
  else {
    res.json({ success: false })
  }
})

app.post('/logout', (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/"
  });

  res.clearCookie("email", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/"
  });
  res.json({ success: true })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
