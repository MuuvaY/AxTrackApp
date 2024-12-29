import * as React from "react";
import Svg, { Path, Circle, Rect } from "react-native-svg";

function Home(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <Path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
      <Path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </Svg>
  );
}

function Dumbell(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <Path d="M14.4 14.4 9.6 9.6" />
      <Path d="M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z" />
      <Path d="m21.5 21.5-1.4-1.4" />
      <Path d="M3.9 3.9 2.5 2.5" />
      <Path d="M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z" />
    </Svg>
  );
}

function User(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <Path d="M18 20a6 6 0 0 0-12 0" />
      <Circle cx="12" cy="10" r="4" />
      <Circle cx="12" cy="12" r="10" />
    </Svg>
  );
}

function Mail(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <Rect width="20" height="16" x="2" y="4" rx="2" />
      <Path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </Svg>
  );
}

function Lock(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <Circle cx="12" cy="16" r="1" />
      <Rect x="3" y="10" width="18" height="12" rx="2" />
      <Path d="M7 10V7a5 5 0 0 1 10 0v3" />
    </Svg>
  );
}

function UserRound(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <Circle cx="12" cy="8" r="5" />
      <Path d="M20 21a8 8 0 0 0-16 0" />
    </Svg>
  );
}

function Weight(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <Circle cx="12" cy="5" r="3" />
      <Path d="M6.5 8a2 2 0 0 0-1.905 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.925-2.54L19.4 9.5A2 2 0 0 0 17.48 8Z" />
    </Svg>
  );
}

function Time(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <Path d="M5 22h14" />
      <Path d="M5 2h14" />
      <Path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" />
      <Path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
    </Svg>
  );
}

function EyeOff(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <Path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
      <Path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
      <Path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
      <Path d="m2 2 20 20" />
    </Svg>
  );
}

function DumbellCross(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="111"
      height="111"
      viewBox="0 0 111 111"
      fill="none"
      {...props}
    >
      <Path
        d="M66.6 66.6L44.4 44.4"
        stroke="#FF3400"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M86.2886 99.3681C84.5541 101.103 82.2015 102.078 79.7482 102.079C77.2948 102.079 74.9418 101.105 73.2068 99.3704C71.4717 97.636 70.4967 95.2833 70.4963 92.83C70.4959 90.3767 71.47 88.0237 73.2045 86.2886L65.0321 94.4656C63.297 96.2007 60.9438 97.1754 58.49 97.1754C56.0363 97.1754 53.683 96.2007 51.948 94.4656C50.2129 92.7305 49.2382 90.3773 49.2382 87.9235C49.2382 85.4698 50.2129 83.1165 51.948 81.3815L81.3815 51.948C83.1165 50.2129 85.4698 49.2382 87.9235 49.2382C90.3773 49.2382 92.7305 50.2129 94.4656 51.948C96.2007 53.683 97.1754 56.0363 97.1754 58.49C97.1754 60.9438 96.2007 63.297 94.4656 65.0321L86.2886 73.2045C88.0237 71.47 90.3767 70.4959 92.83 70.4963C95.2833 70.4967 97.636 71.4717 99.3704 73.2068C101.105 74.9418 102.079 77.2948 102.079 79.7482C102.078 82.2015 101.103 84.5541 99.3681 86.2886L86.2886 99.3681Z"
        stroke="#FF3400"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M99.4375 99.4375L92.9625 92.9625"
        stroke="#FF3400"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18.0375 18.0375L11.5625 11.5625"
        stroke="#FF3400"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M29.6185 59.052C27.8834 60.7871 25.5302 61.7618 23.0764 61.7618C20.6227 61.7618 18.2694 60.7871 16.5344 59.052C14.7993 57.3169 13.8246 54.9637 13.8246 52.5099C13.8246 50.0562 14.7993 47.7029 16.5344 45.9679L24.7114 37.7955"
        stroke="#FF3400"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M27.1161 87.3707C28.1055 86.3706 28.1055 84.7464 27.1161 83.7463C26.1268 82.7462 24.5201 82.7462 23.5307 83.7463L15.1964 92.1792L6.85421 83.7543"
        fill="#18FF13"
      />
    </Svg>
  );
}

function Plus(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <Path d="M5 12h14" />
      <Path d="M12 5v14" />
    </Svg>
  );
}

function ChevronRight(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <Path d="m9 18 6-6-6-6" />
    </Svg>
  );
}

function Calendar(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <Path d="M8 2v4" />
      <Path d="M16 2v4" />
      <Rect width="18" height="18" x="3" y="4" rx="2" />
      <Path d="M3 10h18" />
    </Svg>
  );
}

export const icons = {
  Home,
  Dumbell,
  User,
  Mail,
  Lock,
  UserRound,
  Weight,
  Time,
  EyeOff,
  DumbellCross,
  Plus,
  ChevronRight,
  Calendar,
};
