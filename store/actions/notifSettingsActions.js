export const NOTIF_SETTINGS_UPDATE = "NOTIF_SETTINGS_UPDATE";

export const updateSettings = (name) => {
  return { type: NOTIF_SETTINGS_UPDATE, name };
};
