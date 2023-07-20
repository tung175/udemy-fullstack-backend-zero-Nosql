const UploadSingleFile = async (fileObject) => {
    let uploadPath = __dirname + fileObject.name;
  
    // Use the mv() method to place the file somewhere on your server
    // save => public/images/upload
    // abc.png =? abc-timestamp.png
    // upload mutiple files
    try {
        await fileObject.mv(uploadPath);
        return{
            status: 'susccess',
            path: 'link-image',
            error: null
        }
    } catch (error) {
        console.log('>>>> check err: ', error);
            return{
                status: 'failed',
                path: 'null',
                error: JSON.stringify(error)
            }
    }
}

const UploadMutipleFile = () => {

}

module.exports = {
    UploadSingleFile, UploadMutipleFile
}