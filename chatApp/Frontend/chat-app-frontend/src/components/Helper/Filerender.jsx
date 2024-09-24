  import { transformImage } from "../../Features/Lib";
  const FileRender=({fileUrl})=>{
    const renderfile=()=>{
        if (fileUrl.endsWith('.jpg') || fileUrl.endsWith('.jpeg') || fileUrl.endsWith('.png') || fileUrl.endsWith('.gif')){
            return  <a href={fileUrl} target="_blank" rel="noopener noreferrer"> <img
            src={transformImage(fileUrl, 200)}
            alt="Attachement"
            width={"200px"}
            height={"150px"}
            style={{
              objectFit: "contain",
            }}
          />
          </a>;
        }
        else if(fileUrl.endsWith('.mp4') || fileUrl.endsWith('.webm') || fileUrl.endsWith('.ogg')){
            return (
                 <video src={fileUrl} preload="none" width={"200px"} controls autoPlay />
              );
        }
        else if(fileUrl.endsWith('.mp3') || fileUrl.endsWith('.wav') || fileUrl.endsWith('.ogg')){
            return (
                <audio controls className="w-full">
                  <source src={fileUrl} type="audio/mpeg" />
                  Your browser does not support the audio tag.
                </audio>
              );
        }
        else{
            return (
                <div className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15.172 7l-6.586 6.586a2 2 0 000 2.828l2.586 2.586a2 2 0 002.828 0l6.586-6.586a2 2 0 000-2.828L17.172 7a2 2 0 00-2.828 0zM11 11l2 2"
                    />
                  </svg>
                  <a
                    href={fileUrl}
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download File
                  </a>
                </div>
              );
        }
    }
    return <div>{renderfile()}</div>;
}
export default FileRender