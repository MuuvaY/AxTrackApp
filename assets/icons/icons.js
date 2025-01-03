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

function ChevronsUpDown(props) {
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
      <Path d="m7 15 5 5 5-5" />
      <Path d="m7 9 5-5 5 5" />
    </Svg>
  );
}
function Tag(props) {
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
      <Path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
      <Circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
    </Svg>
  );
}
function Trash(props) {
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
      <Path d="M3 6h18" />
      <Path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <Path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <Path d="M10 11v6" />
      <Path d="M14 11v6" />
    </Svg>
  );
}

function Edit(props) {
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
      <Path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
      <Path d="m15 5 4 4" />
    </Svg>
  );
}

function Ellipsis(props) {
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
      <Circle cx="12" cy="12" r="1" />
      <Circle cx="19" cy="12" r="1" />
      <Circle cx="5" cy="12" r="1" />
    </Svg>
  );
}

function Zap(props) {
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
      <Path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
    </Svg>
  );
}

function Settings(props) {
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
      <Path d="M20 7h-9" />
      <Path d="M14 17H5" />
      <Circle cx="17" cy="17" r="3" />
      <Circle cx="7" cy="7" r="3" />
    </Svg>
  );
}

function ArrowDownStat(props) {
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
      <Path d="m3 16 4 4 4-4" />
      <Path d="M7 20V4" />
      <Path d="M11 4h10" />
      <Path d="M11 8h7" />
      <Path d="M11 12h4" />
    </Svg>
  );
}
function Hand(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <Path
        d="M8.57145 0C9.36162 0 10 0.558594 10 1.25V5.625H7.14287V1.25C7.14287 0.558594 7.78127 0 8.57145 0ZM2.85716 2.5C2.85716 1.80859 3.49555 1.25 4.28573 1.25C5.07591 1.25 5.7143 1.80859 5.7143 2.5V5.625H2.85716V2.5ZM11.4286 2.5C11.4286 1.80859 12.067 1.25 12.8572 1.25C13.6473 1.25 14.2857 1.80859 14.2857 2.5V6.25C14.2857 6.94141 13.6473 7.5 12.8572 7.5C12.067 7.5 11.4286 6.94141 11.4286 6.25V2.5ZM15.7143 5C15.7143 4.30859 16.3527 3.75 17.1429 3.75C17.9331 3.75 18.5714 4.30859 18.5714 5V7.5C18.5714 8.19141 17.9331 8.75 17.1429 8.75C16.3527 8.75 15.7143 8.19141 15.7143 7.5V5ZM11.4286 8.4375V8.41406C11.8482 8.625 12.3348 8.75 12.8572 8.75C13.4464 8.75 13.9911 8.59375 14.4464 8.32812C14.8348 9.30078 15.8973 10 17.1429 10C17.6652 10 18.1518 9.87891 18.5714 9.66406V10C18.5714 12.043 17.4509 13.8594 15.7143 15V18.75C15.7143 19.4414 15.0759 20 14.2857 20H7.14287C6.3527 20 5.7143 19.4414 5.7143 18.75V15.6875C4.94198 15.3789 4.23216 14.9531 3.62055 14.418L3.1027 13.9648C2.03127 13.0273 1.42859 11.7539 1.42859 10.4297V9.375C1.42859 7.99609 2.70984 6.875 4.28573 6.875H8.2143C9.20091 6.875 10 7.57422 10 8.4375C10 9.30078 9.20091 10 8.2143 10H5.7143C5.32145 10 5.00002 10.2812 5.00002 10.625C5.00002 10.9688 5.32145 11.25 5.7143 11.25H8.2143C9.99109 11.25 11.4286 9.99219 11.4286 8.4375Z"
        fill="#18FF13"
      />
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
  ChevronsUpDown,
  Tag,
  Trash,
  Edit,
  Ellipsis,
  Zap,
  Settings,
  ArrowDownStat,
  Hand,
};
