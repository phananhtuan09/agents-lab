export interface SettingsEntryDto {
  key: string;
  value: string;
}

export interface AppSettingsDto {
  language: 'en' | 'vi';
  theme: 'dark' | 'light';
}

export function toAppSettingsDto(entries: SettingsEntryDto[]): AppSettingsDto {
  const map = new Map(entries.map((e) => [e.key, e.value]));
  return {
    language: (map.get('language') as 'en' | 'vi') ?? 'en',
    theme: (map.get('theme') as 'dark' | 'light') ?? 'dark',
  };
}

export function appSettingsToEntries(dto: AppSettingsDto): SettingsEntryDto[] {
  return [
    { key: 'language', value: dto.language },
    { key: 'theme', value: dto.theme },
  ];
}
