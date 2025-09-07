import ffmpeg from 'fluent-ffmpeg';
import { promisify } from 'util';

// Promisify ffmpeg methods
const ffprobe = promisify(ffmpeg.ffprobe);

/**
 * Get video duration in seconds
 * @param {string} filePath - Path to video file
 * @returns {Promise<number>} Duration in seconds
 */
export const getVideoDuration = async (filePath) => {
  try {
    const metadata = await ffprobe(filePath);
    return metadata.format.duration;
  } catch (error) {
    console.error('Error getting video duration:', error);
    throw new Error('Could not determine video duration');
  }
};

/**
 * Validate video duration (max 4 minutes = 240 seconds)
 * @param {string} filePath - Path to video file
 * @returns {Promise<boolean>} True if valid duration
 */
export const validateVideoDuration = async (filePath) => {
  try {
    const duration = await getVideoDuration(filePath);
    const maxDuration = 240; // 4 minutes in seconds
    
    if (duration > maxDuration) {
      throw new Error(`Video duration (${Math.round(duration)}s) exceeds maximum allowed duration (${maxDuration}s)`);
    }
    
    return true;
  } catch (error) {
    throw error;
  }
};

/**
 * Generate video thumbnail
 * @param {string} videoPath - Path to video file
 * @param {string} thumbnailPath - Path for thumbnail output
 * @param {number} timeOffset - Time offset in seconds (default: 1)
 * @returns {Promise<string>} Path to generated thumbnail
 */
export const generateThumbnail = async (videoPath, thumbnailPath, timeOffset = 1) => {
  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .screenshots({
        timestamps: [timeOffset],
        filename: thumbnailPath,
        folder: path.dirname(thumbnailPath),
        size: '320x240'
      })
      .on('end', () => resolve(thumbnailPath))
      .on('error', reject);
  });
};

/**
 * Get video metadata
 * @param {string} filePath - Path to video file
 * @returns {Promise<Object>} Video metadata
 */
export const getVideoMetadata = async (filePath) => {
  try {
    const metadata = await ffprobe(filePath);
    return {
      duration: metadata.format.duration,
      size: metadata.format.size,
      bitrate: metadata.format.bit_rate,
      codec: metadata.streams[0]?.codec_name,
      width: metadata.streams[0]?.width,
      height: metadata.streams[0]?.height,
      fps: metadata.streams[0]?.r_frame_rate
    };
  } catch (error) {
    console.error('Error getting video metadata:', error);
    throw new Error('Could not get video metadata');
  }
};
