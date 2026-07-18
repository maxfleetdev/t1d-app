export type SectionChild = {
  id: string;
  title: string;
  file: string;
};

export type SectionGroup = {
  id: string;
  title: string;
  file?: string;
  children?: SectionChild[];
};

export const CONTENT_MANIFEST_PATH = '/content/sections.json';

export async function getSections(): Promise<SectionGroup[]> {
  const response = await fetch(CONTENT_MANIFEST_PATH);

  if (!response.ok) {
    throw new Error(`Failed to load section manifest from ${CONTENT_MANIFEST_PATH}`);
  }

  return response.json();
}

export function findSectionById(sections: SectionGroup[], activeId: string): SectionChild | null {
  for (const section of sections) {
    if (section.id === activeId) {
      return { id: section.id, title: section.title, file: section.file ?? '' };
    }

    const childMatch = section.children?.find((child) => child.id === activeId);
    if (childMatch) {
      return childMatch;
    }
  }

  return null;
}

export function flattenSections(sections: SectionGroup[]): SectionChild[] {
  return sections.flatMap((section) => section.children ?? []);
}