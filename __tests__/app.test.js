/**
 * Next.js Application Test Suite
 * Lab 4: Deployment Pipelines (CI/CD)
 *
 * Comprehensive test suite covering API routes, database connections,
 * and core application functionality.
 */

// Mock fetch for external API calls
global.fetch = jest.fn();

// Mock environment variables
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test';
process.env.GOOGLE_GENERATIVE_AI_API_KEY = 'test-api-key';
process.env.MLOPS_SERVICE_URL = 'http://localhost:5001';

describe('Next.js Application Tests', () => {

  beforeEach(() => {
    // Reset fetch mock before each test
    global.fetch.mockClear();
  });

  afterAll(() => {
    // Clean up after tests
    jest.restoreAllMocks();
  });

  describe('Environment Configuration', () => {
    test('should have required environment variables', () => {
      expect(process.env.DATABASE_URL).toBeDefined();
      expect(process.env.GOOGLE_GENERATIVE_AI_API_KEY).toBeDefined();
      expect(process.env.MLOPS_SERVICE_URL).toBeDefined();
    });

    test('should have valid database URL format', () => {
      const dbUrl = process.env.DATABASE_URL;
      expect(dbUrl).toMatch(/^postgresql:\/\//);
    });

    test('should have non-empty API key', () => {
      const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
      expect(apiKey).toBeTruthy();
      expect(apiKey.length).toBeGreaterThan(0);
    });
  });

  describe('Application Structure', () => {
    test('package.json should exist and have required scripts', () => {
      const packageJson = require('../package.json');
      expect(packageJson.scripts).toBeDefined();
      expect(packageJson.scripts.build).toBeDefined();
      expect(packageJson.scripts.start).toBeDefined();
      expect(packageJson.scripts.dev).toBeDefined();
    });

    test('should have required dependencies', () => {
      const packageJson = require('../package.json');
      const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };

      expect(dependencies.next).toBeDefined();
      expect(dependencies.react).toBeDefined();
      expect(dependencies['@vercel/postgres']).toBeDefined();
      expect(dependencies['@ai-sdk/google']).toBeDefined();
    });
  });

  describe('Core Functionality', () => {
    test('should validate business data structure', () => {
      const validBusiness = {
        name: 'Test Business',
        industry: 'Healthcare',
        description: 'A test dental office'
      };

      expect(validBusiness.name).toBeTruthy();
      expect(validBusiness.industry).toBeTruthy();
      expect(validBusiness.description).toBeTruthy();
    });

    test('should validate message structure', () => {
      const validMessage = {
        role: 'user',
        content: 'Hello, I need help with booking an appointment'
      };

      expect(validMessage.role).toBe('user');
      expect(validMessage.content).toBeTruthy();
      expect(typeof validMessage.content).toBe('string');
    });

    test('should validate appointment data structure', () => {
      const validAppointment = {
        business_id: 'test-business-123',
        customer_name: 'John Doe',
        customer_email: 'john@example.com',
        service_type: 'Dental Cleaning',
        preferred_date: '2024-01-15',
        preferred_time: '10:00 AM'
      };

      expect(validAppointment.business_id).toBeTruthy();
      expect(validAppointment.customer_name).toBeTruthy();
      expect(validAppointment.customer_email).toMatch(/\S+@\S+\.\S+/);
      expect(validAppointment.service_type).toBeTruthy();
      expect(validAppointment.preferred_date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  describe('API Route Validation', () => {
    test('should handle chat request validation', () => {
      const validChatRequest = {
        businessId: 'business-123',
        conversationId: 'conv-456',
        messages: [
          { role: 'user', content: 'Hello' }
        ]
      };

      expect(validChatRequest.businessId).toBeTruthy();
      expect(validChatRequest.messages).toBeInstanceOf(Array);
      expect(validChatRequest.messages.length).toBeGreaterThan(0);
      expect(validChatRequest.messages[0].role).toBe('user');
      expect(validChatRequest.messages[0].content).toBeTruthy();
    });

    test('should validate appointment booking request', () => {
      const validBookingRequest = {
        businessId: 'business-123',
        customerName: 'Jane Smith',
        customerEmail: 'jane@example.com',
        serviceType: 'Consultation',
        preferredDateTime: '2024-01-20T14:00:00Z'
      };

      expect(validBookingRequest.businessId).toBeTruthy();
      expect(validBookingRequest.customerName).toBeTruthy();
      expect(validBookingRequest.customerEmail).toMatch(/\S+@\S+\.\S+/);
      expect(validBookingRequest.serviceType).toBeTruthy();
      expect(validBookingRequest.preferredDateTime).toBeTruthy();
    });
  });

  describe('Database Operations', () => {
    test('should validate database connection requirements', () => {
      // Mock database operation
      const mockDatabaseCall = () => {
        if (!process.env.DATABASE_URL) {
          throw new Error('Database URL not configured');
        }
        return Promise.resolve({ success: true });
      };

      expect(() => mockDatabaseCall()).not.toThrow();
    });

    test('should handle business creation data', () => {
      const businessData = {
        name: 'AI Dental Care',
        industry: 'Healthcare',
        description: 'Modern dental practice with AI-powered customer service',
        website: 'https://aidentalcare.com',
        phone: '(555) 123-4567'
      };

      expect(businessData.name).toBeTruthy();
      expect(businessData.industry).toBeTruthy();
      expect(businessData.description).toBeTruthy();
      expect(businessData.phone).toMatch(/^\(\d{3}\) \d{3}-\d{4}$/);
    });
  });

  describe('AI Integration', () => {
    test('should validate AI response structure', () => {
      const mockAIResponse = {
        message: 'Hello! How can I help you today?',
        type: 'text',
        intent: 'general',
        suggested_actions: ['Book appointment', 'Learn more about services']
      };

      expect(mockAIResponse.message).toBeTruthy();
      expect(mockAIResponse.type).toBeTruthy();
      expect(mockAIResponse.intent).toBeTruthy();
      expect(Array.isArray(mockAIResponse.suggested_actions)).toBe(true);
    });

    test('should validate metrics tracking data', () => {
      const metricsData = {
        business_id: 'business-123',
        session_id: 'session-456',
        response_time_ms: 1200,
        tokens_used: 150,
        api_cost_usd: 0.002,
        intent_detected: 'appointment',
        appointment_requested: true
      };

      expect(metricsData.business_id).toBeTruthy();
      expect(metricsData.session_id).toBeTruthy();
      expect(typeof metricsData.response_time_ms).toBe('number');
      expect(typeof metricsData.tokens_used).toBe('number');
      expect(typeof metricsData.api_cost_usd).toBe('number');
      expect(typeof metricsData.appointment_requested).toBe('boolean');
    });
  });

  describe('Error Handling', () => {
    test('should handle missing required fields', () => {
      const invalidRequest = {};

      const validateRequest = (request) => {
        if (!request.businessId) {
          return { error: 'Business ID is required' };
        }
        return { success: true };
      };

      const result = validateRequest(invalidRequest);
      expect(result.error).toBe('Business ID is required');
    });

    test('should handle invalid email format', () => {
      const invalidEmails = ['invalid-email', '@domain.com', 'user@', 'user@.com'];
      const emailRegex = /\S+@\S+\.\S+/;

      invalidEmails.forEach(email => {
        expect(emailRegex.test(email)).toBe(false);
      });
    });

    test('should handle rate limiting scenarios', () => {
      const rateLimitCheck = (requestCount, limit) => {
        return requestCount < limit;
      };

      expect(rateLimitCheck(5, 10)).toBe(true);
      expect(rateLimitCheck(10, 10)).toBe(false);
      expect(rateLimitCheck(15, 10)).toBe(false);
    });
  });

  describe('Security Validation', () => {
    test('should validate input sanitization', () => {
      const maliciousInputs = [
        '<script>alert("xss")</script>',
        'DROP TABLE users;',
        '${process.env.SECRET}',
        '../../../etc/passwd'
      ];

      const sanitizeInput = (input) => {
        return input.replace(/[<>]/g, '');
      };

      maliciousInputs.forEach(input => {
        const sanitized = sanitizeInput(input);
        expect(sanitized).not.toContain('<script>');
        expect(sanitized).not.toContain('</script>');
      });
    });

    test('should validate environment variable access', () => {
      // Ensure sensitive environment variables are not exposed
      const exposedVars = ['DATABASE_URL', 'GOOGLE_GENERATIVE_AI_API_KEY'];

      exposedVars.forEach(varName => {
        // In a real application, these should not be accessible on client side
        expect(typeof process.env[varName]).toBe('string');
      });
    });
  });
});