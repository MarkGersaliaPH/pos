import React, { useState } from "react";

import { FilePond, registerPlugin } from "react-filepond";
// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
function FileUpload({
    multiple = false,
    label = 'Drag & Drop your files or <span class="filepond--label-action">Browse</span>',
    ...props
}) {
    const [files, setFiles] = useState(props.selectedFile || []);

    const onUpdate = (f) => {
        setFiles(f);
        let file = f[0].file;
        props.setImage(file);
    };

    return (
        <div>
            <FilePond
                files={files}
                onupdatefiles={(f) => onUpdate(f)}
                allowMultiple={multiple}
                maxFiles={3}
                server={null}
                name="files" /* sets the file input name, it's filepond by default */
                labelIdle={label}
            />
        </div>
    );
}

export default FileUpload;
