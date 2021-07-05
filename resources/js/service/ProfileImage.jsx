export const profileImage = image => {
    return image ? `storage/${image}` : `storage/profile/default.jpg`;
};
