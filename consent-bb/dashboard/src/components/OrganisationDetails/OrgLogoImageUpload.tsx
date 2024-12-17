import { Avatar, Box } from "@mui/material";
import LogoCammera from "../../assets/camera_photo2.png";
import DefaultLogo from "../../assets/OrganisationDefaultLogo.png";

import { HttpService } from "../../service/HTTPService";

type Props = {
  editMode: boolean;
  logoImageBase64: string | undefined;
  setLogoImageBase64: React.Dispatch<React.SetStateAction<any>>
};

const OrgLogoImageUpload = (props: Props) => {
  const {editMode, setLogoImageBase64 } = props
  let logoImageBase64 = localStorage.getItem('cachedLogoImage')

  const myFile: { file: string; imagePreviewUrl: any } = {
    file: "",
    imagePreviewUrl: "",
  };

  const handleFile = async (e: any) => {
    let reader = new FileReader();
    let file = e.target.files[0];
    let image = /image.jpeg/;

    reader.onloadend = () => {
      myFile.file = file;
      myFile.imagePreviewUrl = reader.result;
    };

    if (file.type.match(image)) {
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append("orgimage", file);

      HttpService.updateOrganisationLogoImage(formData)
        .then((res) => {
          // Get the newly uploaded image from the server
          HttpService.getLogoImage().then((imageBase64) => {
            setLogoImageBase64(imageBase64);
            localStorage.setItem('cachedLogoImage', imageBase64)
          });
        })
        .catch((error) => {
          console.log(`Error: ${error}`);
        });
    }
  };

  return (
    <Box>
      <Avatar
        src={
          logoImageBase64
            ? `data:image/jpeg;charset=utf-8;base64,${logoImageBase64}`
            : DefaultLogo
        }
        alt="logo"
        className="avatar-img"
        style={{
          // position: "absolute",
          objectFit: "contain",
          opacity: editMode ? 0.75 : 1,
          marginTop: "-100px",
          width: "170px",
          height: "170px",
          border: "solid white 6px",
        }}
      />
      {editMode && (
        <Box
          style={{
            position: "relative",
            top: "-160px",
            marginLeft: "10px",
          }}
        >
          <div>
            <form>
              <label className="uptext" htmlFor="uploadLogoImage">
                <img
                  style={{
                    opacity: 0.45,
                  }}
                  src={LogoCammera}
                  alt="img"
                />
              </label>
              <input
                type="file"
                accept="image/jpeg,image/jpg"
                id="uploadLogoImage"
                name="uploadLogoImage"
                hidden={true}
                onChange={handleFile}
              />
            </form>
          </div>
        </Box>
      )}
    </Box>
  );
};

export default OrgLogoImageUpload;
