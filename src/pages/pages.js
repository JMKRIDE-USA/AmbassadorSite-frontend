import { HomePage } from './home.js';
import { SplashPage } from './splash-page.js';
import { SignUpPage } from './sign-up.js';
import { SignInPage } from './sign-in.js';
import { CreateChallengePage } from './create-challenge.js';
import { Profile } from './profile.js';
import { AmbassadorApplicationPage } from './ambassador-application.js';
import { ChallengeSubmissionPage } from './challenge-submission.js';
import { AdminPage } from './admin.js';
import { UserPage } from './user.js';
import { ChallengePage } from './challenge.js';
import { ReferralCodePage } from './referralcode.js';
import { FAQPage } from './faq.js';
import { VerifyEmailPage } from './verify-email.js';


export const homePage = {
  title: "Home",
  component: HomePage,
  url: "",
  in_header: true,
};
export const splashPage = {
  title: "Splash Page",
  component: SplashPage,
  url: "splash-page",
  in_header: true,
};
export const profilePage = {
  title: "Profile",
  component: Profile,
  url: "profile",
  in_header: false,
  profile_page: true,
};
export const challengeSubmissionPage = {
  title: "Submissions",
  component: ChallengeSubmissionPage,
  url: "challenge-submissions",
  in_header: true,
}
export const challengePage = {
  title: "Challenges",
  component: ChallengePage,
  url: "challenges",
  in_header: false,
}
export const signUpPage = {
  title: "Apply Now",
  component: SignUpPage,
  url: "sign-up",
  in_header: true,
}
export const signInPage = {
  title: "Sign In",
  component: SignInPage,
  url: "sign-in",
}
export const ambassadorApplicationPage = {
  title: "Ambassador Application",
  component: AmbassadorApplicationPage,
  url: "ambassador-application",
  in_header: true,
}
export const createChallengePage = {
  title: "Create Challenge",
  component: CreateChallengePage, 
  url: "create-challenge",
  in_header: true,
}
export const adminDashboardPage = {
  title: "Admin Page",
  component: AdminPage,
  url: "dashboard",
  in_header: true,
}
export const userPage = {
  title: "User Page",
  component: UserPage,
  url: "users",
  in_header: false,
}
export const referralCodePage = {
  title: "Referral Codes",
  component: ReferralCodePage,
  url: "referralcodes",
  in_header: true,
}
export const faqPage = {
  title: "FAQ",
  component: FAQPage,
  url: "faq",
  in_header: true,
}
export const verifyEmailPage = {
  title: "VerifyEmail",
  component: VerifyEmailPage,
  url: "verify-email",
  in_header: false,
}
export const all_pages = [
  homePage,
  splashPage,
  profilePage,
  challengeSubmissionPage,
  challengePage,
  signUpPage,
  signInPage,
  ambassadorApplicationPage,
  createChallengePage,
  adminDashboardPage,
  userPage,
  referralCodePage,
  faqPage,
  verifyEmailPage,
]

