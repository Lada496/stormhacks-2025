// Set up PDF.js worker (only in browser)
let pdfjsLib = null;
let mammoth = null;

// Dynamic imports to avoid SSR issues
const initializeLibraries = async () => {
  if (typeof window === 'undefined') {
    throw new Error('This parser only works in the browser');
  }
  
  if (!pdfjsLib) {
    pdfjsLib = await import('pdfjs-dist');
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
  }
  
  if (!mammoth) {
    mammoth = await import('mammoth');
  }
  
  return { pdfjsLib, mammoth };
};

/**
 * Parse PDF file and extract text content
 * @param {File} file - PDF file object
 * @returns {Promise<string>} - Extracted text content
 */
async function parsePDF(file) {
  try {
    await initializeLibraries(); // Initialize libraries first
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    
    let fullText = '';
    
    // Extract text from each page
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      
      // Combine text items with proper spacing
      const pageText = textContent.items
        .map(item => item.str)
        .join(' ')
        .replace(/\s+/g, ' ') // Normalize whitespace
        .trim();
      
      fullText += pageText + '\n\n';
    }
    
    return fullText.trim();
  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw new Error('Failed to parse PDF file. Please ensure it\'s a valid PDF.');
  }
}

/**
 * Parse DOCX file and extract text content
 * @param {File} file - DOCX file object
 * @returns {Promise<string>} - Extracted text content
 */
async function parseDOCX(file) {
  try {
    await initializeLibraries(); // Initialize libraries first
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    
    if (result.messages && result.messages.length > 0) {
      console.warn('DOCX parsing warnings:', result.messages);
    }
    
    return result.value.trim();
  } catch (error) {
    console.error('Error parsing DOCX:', error);
    throw new Error('Failed to parse DOCX file. Please ensure it\'s a valid Word document.');
  }
}

/**
 * Clean and format extracted text
 * @param {string} text - Raw extracted text
 * @returns {string} - Cleaned and formatted text
 */
function cleanText(text) {
  return text
    // Remove excessive whitespace
    .replace(/\s+/g, ' ')
    // Remove multiple newlines
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    // Clean up common PDF artifacts
    .replace(/[^\x20-\x7E\n]/g, '') // Remove non-printable characters
    // Trim
    .trim();
}

/**
 * Parse resume file (PDF or DOCX) and extract text content
 * @param {File} file - Resume file object
 * @returns {Promise<{text: string, metadata: object}>} - Parsed content and metadata
 */
export async function parseResume(file) {
  if (!file) {
    throw new Error('No file provided');
  }

  // Validate file type
  const validTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  
  if (!validTypes.includes(file.type)) {
    throw new Error('Unsupported file type. Please upload a PDF or DOCX file.');
  }

  // Validate file size (max 10MB)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    throw new Error('File too large. Please upload a file smaller than 10MB.');
  }

  try {
    let rawText = '';
    
    if (file.type === 'application/pdf') {
      rawText = await parsePDF(file);
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      rawText = await parseDOCX(file);
    }

    const cleanedText = cleanText(rawText);
    
    if (!cleanedText || cleanedText.length < 50) {
      throw new Error('Unable to extract meaningful text from the file. Please check if the file contains readable text.');
    }

    return {
      text: cleanedText,
      metadata: {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        wordCount: cleanedText.split(/\s+/).length,
        extractedAt: new Date().toISOString()
      }
    };
  } catch (error) {
    console.error('Resume parsing error:', error);
    throw error;
  }
}

/**
 * Extract key sections from resume text
 * @param {string} text - Resume text
 * @returns {object} - Structured resume data
 */
export function extractResumeSections(text) {
  const sections = {
    contact: '',
    summary: '',
    experience: '',
    education: '',
    skills: '',
    other: ''
  };

  // Simple section detection based on common headers
  const sectionPatterns = {
    contact: /^.*?(?=(?:summary|objective|experience|education|skills)|$)/is,
    summary: /(?:summary|objective|profile)[\s\S]*?(?=(?:experience|education|skills|employment)|$)/i,
    experience: /(?:experience|employment|work history|professional experience)[\s\S]*?(?=(?:education|skills|projects)|$)/i,
    education: /(?:education|academic background|qualifications)[\s\S]*?(?=(?:skills|projects|certifications)|$)/i,
    skills: /(?:skills|technical skills|competencies|technologies)[\s\S]*?(?=(?:projects|certifications|references)|$)/i
  };

  for (const [section, pattern] of Object.entries(sectionPatterns)) {
    const match = text.match(pattern);
    if (match) {
      sections[section] = match[0].trim();
    }
  }

  // If no sections found, put everything in 'other'
  if (Object.values(sections).every(section => !section)) {
    sections.other = text;
  }

  return sections;
}

export default { parseResume, extractResumeSections };