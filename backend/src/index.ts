import express, { Application } from 'express';
import dotenv from 'dotenv';
import testRouter from './routes/test.route';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { OAuth2Client, UserRefreshClient } from 'google-auth-library';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

interface GoogleUser {
  id: string;
  email: string;
  verified_email?: boolean;
  name: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
  locale?: string;
}

const oAuth2Client = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  'postmessage'
);

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/test', testRouter);

app.post('/auth/google', async (req, res) => {
  try {
    const { code } = req.body;

    // Exchange Code for Google Tokens
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);

    // Get user info from Google
    const userInfoResponse = await oAuth2Client.request({
      url: 'https://www.googleapis.com/oauth2/v2/userinfo',
    });

    console.log(userInfoResponse);

    const user: GoogleUser = userInfoResponse.data as GoogleUser;

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET not found');
    }

    // Create app Token
    const appToken = jwt.sign(
      { email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Send back to frontend
    res.json({
      user,
      googleTokens: tokens,
      appToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ messgae: 'Authentication Failed!.' });
  }
});

app.post('/auth/google/refresh-token', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const user = new UserRefreshClient(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      refreshToken
    );

    const { credentials } = await user.refreshAccessToken();
    res.json(credentials);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Failed to refresh token' });
  }
});

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    messgae: 'Route not found',
  });
});

// Global error handler
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
      success: false,
      message: err.message || 'Internal Server Error',
    });
  }
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
