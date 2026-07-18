import { useState, useEffect } from 'react';
import { Button, Grid, Group, NavLink, Paper, Title, Stack } from '@mantine/core';
import ReactMarkdown from 'react-markdown';
import { findSectionById, flattenSections, getSections, type SectionGroup } from './SectionData';

export default function ModuleList() {
  const [activeId, setActiveId] = useState('1.1');
  const [sections, setSections] = useState<SectionGroup[]>([]);
  const [markdownContent, setMarkdownContent] = useState('');
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
          setMarkdownContent(`### Error\nCould not load section manifest. ${error}`);
          setIsLoadingSections(false);
        }
      }
    };

    loadSections();

    return () => {
      isMounted = false;
    };
  }, []);

  const currentSection = findSectionById(sections, activeId);
  const flattenedSections = flattenSections(sections);
  const currentIndex = flattenedSections.findIndex((section) => section.id === activeId);
  const previousSection = flattenedSections[currentIndex - 1] ?? null;
  const nextSection = flattenedSections[currentIndex + 1] ?? null;

  useEffect(() => {
    if (!currentSection?.file) {
      return;
    }
    const controller = new AbortController();

    fetch(`/content/${currentSection.file}`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) { 
          throw new Error('Failed to load content');
        }
        return res.text();
      })
      .then((text) => setMarkdownContent(text))
      .catch((error) => {
        if (error instanceof Error && error.name === 'AbortError') {
          return;
        }
        setMarkdownContent('### Error\nCould not load section content.');
      });

    return () => controller.abort();
  }, [activeId, currentSection?.file]);

  return (
    <Grid p="md">
      <Grid.Col span={{ base: 12, md: 3 }}>
        <Stack gap="xs">
          {isLoadingSections ? (
            <div>Loading sections...</div>
          ) : (
            sections.map((parent) => (
              <NavLink
                key={parent.id}
                label={parent.title}
                active={parent.id === activeId}
                onClick={() => {
                  if (!parent.children) setActiveId(parent.id);
                }}
                defaultOpened={true}
              >
                {parent.children?.map((child) => (
                  <NavLink
                    key={child.id}
                    label={child.title}
                    active={child.id === activeId}
                    onClick={() => setActiveId(child.id)}
                  />
                ))}
              </NavLink>
            ))
          )}
        </Stack>
      </Grid.Col>

      <Grid.Col span={{ base: 12, md: 9 }}>
        {currentSection && (
          <Paper p="xl" withBorder shadow="xs">
            <Title order={2} mb="md">{currentSection.title}</Title>
            <div className="markdown-body">
              <ReactMarkdown>{markdownContent}</ReactMarkdown>
            </div>

            <Group justify="space-between" mt="lg">
              {previousSection && (<Button
                  variant="default"
                  onClick={() => previousSection && setActiveId(previousSection.id)}
                  disabled={!previousSection}
                >
                  {previousSection ? `← ${previousSection.title}` : 'Previous section'}
                </Button>) 
                || !previousSection && (<div/>)
              }

              {nextSection && (<Button
                  variant="filled"
                  onClick={() => nextSection && setActiveId(nextSection.id)}
                  disabled={!nextSection}
                >
                  {nextSection ? `${nextSection.title} →` : 'Next section'}
                </Button>) 
                || !nextSection && (<div/>)
              }
            </Group>
          </Paper>
        )}
      </Grid.Col>
    </Grid>
  );
}