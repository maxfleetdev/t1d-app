import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { NavLink, Stack } from '@mantine/core';
import { getSections, type SectionGroup } from './SectionData';

export default function ModuleList() {
  const { sectionId } = useParams<{ sectionId?: string }>();
  const [sections, setSections] = useState<SectionGroup[]>([]);
  const [isLoadingSections, setIsLoadingSections] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadSections = async () => {
      try {
        const sectionList = await getSections();
        if (isMounted) {
          setSections(sectionList);
          setIsLoadingSections(false);
        }
      } catch (error) {
        if (isMounted) {
          setIsLoadingSections(false);
        }
      }
    };

    loadSections();

    return () => {
      isMounted = false;
    };
  }, []);

  const activeId = sectionId ?? '1.1';

  return (
    <Stack gap="xs">
      {isLoadingSections ? (
        <div>Loading sections...</div>
      ) : (
        sections.map((parent) => (
          <NavLink
            key={parent.id}
            label={parent.title}
            active={parent.id === activeId || parent.children?.some((child) => child.id === activeId)}
            defaultOpened={true}
          >
            {parent.children?.map((child) => (
              <NavLink
                key={child.id}
                label={child.title}
                active={child.id === activeId}
                component={Link}
                to={`/learn/${child.id}`}
              />
            ))}
          </NavLink>
        ))
      )}
    </Stack>
  );
}
