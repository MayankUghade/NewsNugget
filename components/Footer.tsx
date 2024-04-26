import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
export default function Footer() {
  return (
    <div className="mt-5 text-lg opacity-80 flex items-center justify-between p-5 lg:container border-t-2">
      <div>Made by @mayank_ughade</div>
      <div className="flex gap-3">
        <GitHubIcon className="text-3xl" />
        <LinkedInIcon className="text-3xl" />
        <XIcon className="text-3xl" />
      </div>
    </div>
  );
}
