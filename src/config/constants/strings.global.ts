export const SYSTEM_ALERT = {
    TASK_DEL_TITLE: 'ARE YOU SURE ?',
    TASK_DEL_DES: '',
    PRJ_ALT_ACC_TITLE: 'Make Project Public ?',
    PRJ_ALT_ACC_DES:
        'Changing project visibility might affect access and collaboration. Review the changes before confirming.',
    NOTIFICATION: 'SYSTEM NOTIFICATION',
    SIGNUP_SUCCESS_TITLE: 'Account Created Successfully!',
    SIGNUP_INVALID_CREDENTIALS: 'Invalid Credentials',
    SIGNUP_SERVER_ERROR:
        "Sorry, we're experiencing server issues. Please try again later.",
    SIGNUP_ANOTHER_FAILED: 'Error',
    LOGIN_SUCCESS_TITLE: '',
    LOGIN_SUCCESS_DES: '',
    LOGIN_FAILED_TITLE: '',
    LOGIN_FAILED_DES: '',
};

export const SYSTEM_COLORS = {
    SIGN_UP_COMPLETE_COLOR: 'text-signup_complete_text',
    SIGN_UP_FAILED_COLOR: 'text-red-500',
};

export const BRIGHT_EMAIL = 'bright-tools-official@gmail.com';

export const RESULT_NOT_FOUND = 'No results found.';

export const WEBSITE_NAME = 'Bright';

export const FILE_SIZE_EXCEED = {
    TITLE: 'File Size Exceeds Limit',
    DES: 'The uploaded exceeds the maximum allowed size of 25MB. Please try uploading a smaller file.',
};

export const ALLOWED_EXTENSIONS = [
    // Image extensions
    'jpg',
    'jpeg',
    'png',
    'gif',
    'bmp',
    // Document extensions
    'pdf',
    'docx',
    'xlsx',
    'pptx',
    'txt',
    // Video extensions
    'mp4',
    'mov',
    'avi',
    'wmv',
];

export const FILE_UNSUPPORTED = {
    TITLE: 'Unsupported File Type',
    DES: `The uploaded file has an unsupported file type. Please upload files with the following extensions: ${ALLOWED_EXTENSIONS.join(', ')}`,
};

export const API_BASE_PORT = 5000;
export const API_BASE_URL = 'http://localhost:' + API_BASE_PORT + '/api/v1/';
