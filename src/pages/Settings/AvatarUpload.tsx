import { useState } from "react";

export function AvatarUpload({
  onFileChange,
}: {
  onFileChange: (file: File | null) => void;
}) {
  const [label, setLabel] = useState("Upload new picture");

  return (
    <div className="form-field settings__field">
      <label className="form-field__label">Profile Picture</label>
      <div className="file-upload-wrapper">
        <input
          type="file"
          id="profile-picture"
          name="profile_picture"
          className="file-upload__input"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0] ?? null;
            onFileChange(file);
            setLabel(file?.name ?? "Upload new picture");
          }}
        />
        <label
          htmlFor="profile-picture"
          className={`file-upload__label${label !== "Upload new picture" ? " has-file" : ""}`}
        >
          <span className="file-upload__text" id="file-name-display">
            {label}
          </span>
        </label>
      </div>
    </div>
  );
}
