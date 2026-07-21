import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Button, Group, Paper, Title } from '@mantine/core';
import ReactMarkdown from 'react-markdown';
import { findSectionById, flattenSections, getSections, type SectionGroup } from './SectionData';

export default function SectionPage() {
  const { sectionId } = useParams<{ sectionId?: string }>();
  const [sections, setSections] = useState<SectionGroup[]>([]);
  const [markdownContent, setMarkdownContent] = useState('');
  const [isLoadingSections, setIsLoadingSections] = useState(true);
  const [isLoadingContent, setIsLoadingContent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const loadSections = async () => {
      try {
        const sectionList = await getSections();
        if (isMounted) {
          setSections(sectionList);
          setIsLoadingSections(false);
        }
      } catch (err) {
        if (isMounted) {
          setError('Could not load section manifest.');
          setIsLoadingSections(false);
        }
      }
    };

    loadSections();

    return () => {
      isMounted = false;
    };
  }, []);

  const currentSection = sectionId ? findSectionById(sections, sectionId) : null;
  const flattenedSections = flattenSections(sections);
  const currentIndex = sectionId ? flattenedSections.findIndex((section) => section.id === sectionId) : -1;
  const previousSection = currentIndex > 0 ? flattenedSections[currentIndex - 1] : null;
  const nextSection = currentIndex >= 0 && currentIndex < flattenedSections.length - 1 ? flattenedSections[currentIndex + 1] : null;

  useEffect(() => {
    if (!currentSection?.file) {
      setMarkdownContent('');
      return;
    }

    const controller = new AbortController();
    setIsLoadingContent(true);
    setError(null);

    fetch(`/content/${currentSection.file}`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to load content');
        }
        return res.text();
      })
      .then((text) => {
        setMarkdownContent(text);
        setIsLoadingContent(false);
      })
      .catch((fetchError) => {
        if (fetchError instanceof Error && fetchError.name === 'AbortError') {
          return;
        }
        setError('Could not load section content.');
        setIsLoadingContent(false);
      });

    return () => controller.abort();
  }, [currentSection?.file]);

  if (isLoadingSections) {
    return <div>Loading sections...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!sectionId) {
    return <div>Select a section from the left to view content.</div>;
  }

  if (!currentSection) {
    return <div>Section not found.</div>;
  }

  return (
    <Paper p="xl" withBorder shadow="xs">
      <Title order={2} mb="md">
        {currentSection.title}
      </Title>
      <div className="markdown-body">
        {isLoadingContent ? <div>Loading content...</div> : <ReactMarkdown>{markdownContent}</ReactMarkdown>}
      </div>
      <Group justify="space-between" mt="lg">
        {previousSection ? (
          <Button
            variant="default"
            onClick={() => navigate(`/learn/${previousSection.id}`)}
          >
            ← {previousSection.title}
          </Button>
        ) : (
          <div />
        )}

        {nextSection ? (
          <Button
            variant="filled"
            onClick={() => navigate(`/learn/${nextSection.id}`)}
          >
            {nextSection.title} →
          </Button>
        ) : (
          <div />
        )}
      </Group>
    </Paper>
  );
}
