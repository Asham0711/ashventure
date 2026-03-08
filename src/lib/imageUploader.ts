import cloudinary from "@/lib/cloudinary";

const MAX_FILES = 6;
const MAX_SIZE = 5 * 1024 * 1024;

interface UploadedImage {
  url: string;
  public_id: string;
}

export const uploadImages = async (
  files: File[]
): Promise<UploadedImage[]> => {
  if (!files || files.length === 0) {
    throw new Error("At least one image is required");
  }

  if (files.length > MAX_FILES) {
    throw new Error("Maximum 6 images allowed");
  }

    const uploadPromises = files.map(async (file) => {
        if (!file.type.startsWith("image/")) {
            throw new Error("Only image files are allowed");
        }

        if (file.size > MAX_SIZE) {
            throw new Error("Image size must be less than 5MB");
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        return new Promise<UploadedImage>((resolve, reject) => {
            cloudinary.uploader
                .upload_stream(
                {
                    folder: "ashventure/blogs",
                    resource_type: "image",
                },
                (error, result) => {
                    if (error || !result) return reject(error);

                    resolve({
                    url: result.secure_url,
                    public_id: result.public_id,
                    });
                }
                )
                .end(buffer);
            });
        }
    );

    return Promise.all(uploadPromises);
};