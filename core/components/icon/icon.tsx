import {
  BlueskyIcon,
  ContactIcon,
  EnterIcon,
  ExternalIcon,
  PortfolioIcon,
  RSSIcon,
  TwitterIcon,
  ArrowIcon,
  PlayIcon,
  PauseIcon,
  RepeatIcon,
  InfoIcon,
  AlertIcon,
  GithubIcon,
  MapIcon,
  StackIcon,
  XIcon,
} from "./icon-list"

interface IconComponent {
  Bluesky: typeof BlueskyIcon
  Contact: typeof ContactIcon
  Enter: typeof EnterIcon
  External: typeof ExternalIcon
  Portfolio: typeof PortfolioIcon
  RSS: typeof RSSIcon
  Twitter: typeof TwitterIcon
  Arrow: typeof ArrowIcon
  Play: typeof PlayIcon
  Pause: typeof PauseIcon
  Repeat: typeof RepeatIcon
  Info: typeof InfoIcon
  Alert: typeof AlertIcon
  Github: typeof GithubIcon
  Map: typeof MapIcon
  Stack: typeof StackIcon
  X: typeof XIcon
  displayName: string
}

const Icon = {} as IconComponent

Icon.Bluesky = BlueskyIcon
Icon.Contact = ContactIcon
Icon.Enter = EnterIcon
Icon.External = ExternalIcon
Icon.Portfolio = PortfolioIcon
Icon.RSS = RSSIcon
Icon.Twitter = TwitterIcon
Icon.Arrow = ArrowIcon
Icon.Play = PlayIcon
Icon.Pause = PauseIcon
Icon.Repeat = RepeatIcon
Icon.Info = InfoIcon
Icon.Alert = AlertIcon
Icon.Github = GithubIcon
Icon.Map = MapIcon
Icon.Stack = StackIcon
Icon.X = XIcon

Icon.displayName = "Icon"

export default Icon