import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { NavLink, Stack, Paper } from '@mantine/core';
import { getSections, type SectionGroup } from './SectionData';

/**
 * Loads and displays the learning sections in nested navlinks. Displays
 * the markdown using react router's Outlet component.
 * @returns list of navigation links for individual learning sections
 */
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

  // Stores and sets the current active section ID
  const activeId = sectionId ?? '1.1';

  return (
    <Paper p="xl" withBorder shadow="xs">
      <Stack gap="xs">
        {isLoadingSections ? (
          <div>Loading sections...</div>
        ) : (
          sections.map((parent) => (
            <NavLink
              key={parent.id}
              label={parent.title}
              active={parent.id === activeId || parent.children?.some((child) => child.id === activeId)}
              defaultOpened={parent.children?.some((child) => child.id === activeId)}
            >
              {parent.children?.map((child) => (
                <NavLink
                  key={child.id}
                  label={child.title}
                  active={child.id === activeId}
                  component={Link}
                  to={`/learn/${child.id}`}
                  variant='filled'
                />
              ))}
            </NavLink>
          ))
        )}
      </Stack>
    </Paper>
  );
}
