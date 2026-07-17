import { useState, useEffect } from 'react';
import { Grid, NavLink, Paper, Title, Stack } from '@mantine/core';
import ReactMarkdown from 'react-markdown';
import { SECTIONS } from './SectionData';

export default function ModuleList() {
  const [activeId, setActiveId] = useState('1.1');
  const [markdownContent, setMarkdownContent] = useState('');

  // 1. Find the metadata item based on activeId
  const getCurrentMetadata = () => {
    for (const section of SECTIONS) {
      if (section.id === activeId) return section;
      const childMatch = section.children?.find((child) => child.id === activeId);
      if (childMatch) return childMatch;
    }
    return null;
  };

  const currentSection = getCurrentMetadata();

  // 2. Fetch the corresponding markdown file when activeId changes
  useEffect(() => {
    if (currentSection?.file) {
      fetch(`/content/${currentSection.file}`)
        .then((res) => {
          if (!res.ok) throw new Error('Failed to load content');
          return res.text();
        })
        .then((text) => setMarkdownContent(text))
        .catch((err) => setMarkdownContent('### Error\nCould not load section content.' + err));
    }
  }, [activeId, currentSection?.file]);

  return (
    <Grid p="md">
      {/* Left Sidebar Layout */}
      <Grid.Col span={{ base: 12, md: 3 }}>
        <Stack gap="xs">
          {SECTIONS.map((parent) => (
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
          ))}
        </Stack>
      </Grid.Col>

      {/* Right Content Panel */}
      <Grid.Col span={{ base: 12, md: 9 }}>
        {currentSection && (
          <Paper p="xl" withBorder shadow="xs">
            <Title order={2} mb="md">{currentSection.title}</Title>
            <div className="markdown-body">
              {/* 3. Render the fetched markdown string */}
              <ReactMarkdown>{markdownContent}</ReactMarkdown>
            </div>
          </Paper>
        )}
      </Grid.Col>
    </Grid>
  );
}