import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export const parseResume = async (file) => {
  try {
    if (!file) {
      throw new Error('No file provided');
    }

    const fileType = file.type;
    const fileName = file.name.toLowerCase();

    console.log('Parsing file:', fileName, 'Type:', fileType);

    if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
      return await parsePDF(file);
    } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || fileName.endsWith('.docx')) {
      return await parseDOCX(file);
    } else {
      throw new Error(`Unsupported file type: ${fileType}. Please upload a PDF or DOCX file.`);
    }
  } catch (error) {
    console.error('Resume parsing error:', error);
    throw new Error(`Failed to parse resume: ${error.message}`);
  }
};

const parsePDF = async (file) => {
  console.log('Starting PDF parsing...');
  
  try {
    const arrayBuffer = await file.arrayBuffer();
    console.log('File converted to ArrayBuffer, size:', arrayBuffer.byteLength);
    
    // Configure PDF.js options for better compatibility
    const loadingTask = pdfjsLib.getDocument({
      data: arrayBuffer,
      useSystemFonts: true,
      verbosity: 0, // Reduce console noise
      cMapPacked: true,
      standardFontDataUrl: `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/standard_fonts/`,
      cMapUrl: `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/cmaps/`
    });
    
    const pdf = await loadingTask.promise;
    console.log('PDF loaded successfully, pages:', pdf.numPages);
    
    let fullText = '';
    const extractedPages = [];
    const metadata = {
      pageCount: pdf.numPages,
      title: '',
      author: '',
      subject: '',
      creator: '',
      producer: '',
      creationDate: null,
      modificationDate: null
    };

    // Extract metadata with better error handling
    try {
      const pdfMetadata = await pdf.getMetadata();
      if (pdfMetadata?.info) {
        metadata.title = pdfMetadata.info.Title || '';
        metadata.author = pdfMetadata.info.Author || '';
        metadata.subject = pdfMetadata.info.Subject || '';
        metadata.creator = pdfMetadata.info.Creator || '';
        metadata.producer = pdfMetadata.info.Producer || '';
        metadata.creationDate = pdfMetadata.info.CreationDate || null;
        metadata.modificationDate = pdfMetadata.info.ModDate || null;
      }
      console.log('PDF metadata extracted:', metadata);
    } catch (metaError) {
      console.warn('Could not extract PDF metadata:', metaError.message);
    }

    // Extract text from all pages with improved text extraction
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      try {
        console.log(`Processing page ${pageNum}/${pdf.numPages}...`);
        const page = await pdf.getPage(pageNum);
        
        // Get text content with better options
        const textContent = await page.getTextContent({
          includeMarkedContent: true,
          disableNormalization: false
        });
        
        // Process text items with better spacing and formatting
        let pageText = '';
        let lastY = null;
        let lastX = null;
        
        for (const item of textContent.items) {
          if (item.str.trim()) {
            // Add line breaks for significant Y position changes (new lines)
            if (lastY !== null && Math.abs(lastY - item.transform[5]) > 5) {
              pageText += '\n';
            }
            // Add spaces for significant X position changes (word spacing)
            else if (lastX !== null && (item.transform[4] - lastX) > 10) {
              pageText += ' ';
            }
            
            pageText += item.str;
            lastY = item.transform[5];
            lastX = item.transform[4] + item.width;
          }
        }
        
        if (pageText.trim()) {
          fullText += pageText.trim() + '\n\n';
          extractedPages.push({
            pageNumber: pageNum,
            text: pageText.trim(),
            characterCount: pageText.trim().length
          });
        }
        
        console.log(`Page ${pageNum} extracted: ${pageText.trim().length} characters`);
        
        // Clean up page resources
        page.cleanup();
        
      } catch (pageError) {
        console.warn(`Error extracting text from page ${pageNum}:`, pageError.message);
        // Continue with other pages even if one fails
      }
    }

    // Clean up PDF document
    pdf.cleanup();

    const cleanedText = cleanText(fullText);
    
    if (!cleanedText || cleanedText.length < 10) {
      throw new Error(
        'No readable text found in PDF. This might be because:\n' +
        '• The PDF contains only images or scanned content\n' +
        '• The PDF is password protected\n' +
        '• The PDF file is corrupted\n' +
        'Please try using the "Paste Text Instead" option as a fallback.'
      );
    }

    console.log('PDF parsing completed successfully:', cleanedText.length, 'characters');
    
    return {
      text: cleanedText,
      metadata: {
        ...metadata,
        extractedPages: extractedPages.length,
        totalCharacters: cleanedText.length,
        pageDetails: extractedPages
      },
      wordCount: cleanedText.split(/\s+/).filter(word => word.length > 0).length,
      extractedPages: extractedPages.length
    };
    
  } catch (error) {
    console.error('PDF parsing error:', error);
    
    // Provide more helpful error messages
    let errorMessage = 'PDF parsing failed';
    if (error.message.includes('Invalid PDF')) {
      errorMessage = 'Invalid PDF file. Please ensure the file is not corrupted.';
    } else if (error.message.includes('Password')) {
      errorMessage = 'PDF is password protected. Please remove password protection and try again.';
    } else if (error.message.includes('Network')) {
      errorMessage = 'Network error while loading PDF resources. Please check your connection.';
    } else {
      errorMessage = `PDF parsing failed: ${error.message}`;
    }
    
    throw new Error(errorMessage);
  }
};

const parseDOCX = async (file) => {
  try {
    console.log('Starting DOCX parsing...');
    const arrayBuffer = await file.arrayBuffer();
    
    const result = await mammoth.extractRawText({ 
      arrayBuffer,
      // Add options for better text extraction
      includeEmbeddedStyleMap: true,
      includeDefaultStyleMap: true
    });
    
    const cleanedText = cleanText(result.value);
    
    if (!cleanedText || cleanedText.length < 10) {
      throw new Error(
        'No readable text found in DOCX file. The document might be empty or contain only images.'
      );
    }

    console.log('DOCX parsing completed successfully:', cleanedText.length, 'characters');
    
    return {
      text: cleanedText,
      metadata: {
        wordCount: cleanedText.split(/\s+/).filter(word => word.length > 0).length,
        messages: result.messages || [],
        totalCharacters: cleanedText.length
      },
      wordCount: cleanedText.split(/\s+/).filter(word => word.length > 0).length
    };
    
  } catch (error) {
    console.error('DOCX parsing error:', error);
    throw new Error(`DOCX parsing failed: ${error.message}`);
  }
};

const cleanText = (text) => {
  if (!text) return '';
  
  return text
    // Normalize line breaks
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    // Remove excessive whitespace but preserve structure
    .replace(/[ \t]+/g, ' ')  // Multiple spaces/tabs to single space
    .replace(/\n\s*\n\s*\n/g, '\n\n')  // Multiple line breaks to double
    // Clean up common PDF artifacts
    .replace(/\u00A0/g, ' ')  // Non-breaking spaces
    .replace(/\u2022/g, '•')  // Bullet points
    .replace(/\u2013/g, '–')  // En dash
    .replace(/\u2014/g, '—')  // Em dash
    .replace(/\u201C/g, '"')  // Left double quote
    .replace(/\u201D/g, '"')  // Right double quote
    .replace(/\u2018/g, "'")  // Left single quote
    .replace(/\u2019/g, "'")  // Right single quote
    .trim();
};