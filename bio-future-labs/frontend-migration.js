// force-clean-migration-final.js - Fixes all team member insertion issues
const API_BASE_URL = 'http://localhost:8000';

// EXACT team members data - using different emails to avoid conflicts
const exactTeamMembers = [
  {
    name: "Dr.Sarika Kumari",
    position: "CEO/Co-Founder",
    bio: "Co-founder of BioLabMate with expertise in biotechnology, biomaterials, and advanced R&D, holding a Ph.D. in Biochemistry.",
    image_url: "/src/assets/Sarika.jpg",
    linkedin_url: "https://www.linkedin.com/in/sarikakum/",
    email: "sarika.kumari@biolabmate.com",
    is_active: true
  },
  {
    name: "Sanjay Dubey",
    position: "CTO/Co-Founder",
    bio: "Chemical Engineer at BioLabMate specializing in product development, process optimization, and business growth initiatives.",
    image_url: "/src/assets/Sanjay.jpg",
    linkedin_url: "https://www.linkedin.com/in/snjaykdubey/",
    email: "sanjay.dubey@biolabmate.com",
    is_active: true
  },
  {
    name: "Dr. Gordon Slade",
    position: "Aquaculture Advisor",
    bio: "Advisor at BioLabMate with extensive leadership in fisheries, aquaculture, and ocean industries, guiding strategy, partnerships, and sustainability.",
    image_url: "/src/assets/Gordon.jpg",
    linkedin_url: "https://www.linkedin.com/in/gordon-slade-cm-onl-lld-frcgs-b9478854/?original_referer=https%3A%2F%2Fwww%2Egoogle%2Ecom%2F&originalSubdomain=ca",
    email: "gordon.slade@biolabmate.com",
    is_active: true
  },
  {
    name: "Anil Manyam",
    position: "Software Developer (Intern)",
    bio: "Software Developer at BioLabMate, contributing to the design and development of dynamic web applications and digital platforms that enhance user experience and performance",
    image_url: "/src/assets/Anil.jpg",
    linkedin_url: "https://www.linkedin.com/in/anil-manyam-698662248/",
    email: "anilmanyam.630@gmail.com",
    is_active: true
  },
  {
    name: "Vaibhav Thummar",
    position: "Software Engineer(Intern)",
    bio: "Software Developer at BioLabMate, creating impactful websites and software solutions while managing web content and digital development.",
    image_url: "/src/assets/Vaibhav.jpg",
    linkedin_url: "https://www.linkedin.com/in/vaibhav-thummar-951498249/",
    email: "vaibhav.it178@gmail.com",
    is_active: true
  }
];

// EXACT journey milestones
const exactJourneyMilestones = [
  {
    title: "National Recognition and Early Momentum — Ocean Climate Challenge (National Winner 2023)",
    description: "BioLabMate began its journey with a strong start, being named the Ocean Climate Challenge National Winner 2023, a recognition that celebrated our innovation in replacing single-use petro-plastics with seaweed-derived bioplastics for laboratories.",
    year: 2023,
    category: "Recognition",
    is_major: true,
    order_index: 1
  },
  {
    title: "Foresight Canada — National CleanTech Accelerator",
    description: "To accelerate our growth, BioLabMate joined the National CleanTech Accelerator under Foresight Canada, gaining access to expert mentorship, industry connections, and commercialization resources.",
    year: 2023,
    category: "Accelerator",
    is_major: false,
    order_index: 2
  },
  {
    title: "econext — CleanTech Innovation Award",
    description: "In 2024, our innovation was once again recognized when BioLabMate won the CleanTech Innovation Award from econext. This reinforced our leadership in sustainable materials and circular economy solutions.",
    year: 2024,
    category: "Recognition",
    is_major: true,
    order_index: 3
  },
  {
    title: "RBC Spring Program — Top 15 of 75+",
    description: "We also participated in the RBC Spring Program, ranking 15th out of over 75 applications, which provided valuable exposure and strategic business guidance.",
    year: 2024,
    category: "Program",
    is_major: false,
    order_index: 4
  },
  {
    title: "Blue BioValue — International Blue-Tech Accelerator",
    description: "BioLabMate was selected for the International Blue-Tech Accelerator – Blue BioValue, connecting us with global networks in ocean-based innovation.",
    year: 2025,
    category: "Accelerator",
    is_major: true,
    order_index: 5
  },
  {
    title: "Parliament of Canada — Standing Committee on Science & Research (SRSR)",
    description: "We were also invited as a witness to the Standing Committee on Science and Research (SRSR) at the Canadian Parliament, contributing our perspective on innovation, science, and research in recycling plastics.",
    year: 2025,
    category: "Government",
    is_major: true,
    order_index: 6
  }
];

async function loginAdmin() {
  try {
    console.log('🔐 Logging in as admin...');
    const response = await fetch(`${API_BASE_URL}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'admin', password: 'BioLabMate' })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Login failed');
    }
    
    const data = await response.json();
    console.log('✅ Login successful!\n');
    return data.access_token;
  } catch (error) {
    console.error(' Login error:', error);
    throw error;
  }
}

async function deleteAllExistingData(token) {
  console.log('🗑️ DELETING ALL EXISTING DATA (multiple attempts)...\n');
  
  // Delete team members with multiple attempts
  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      console.log(`Attempt ${attempt}: Checking for team members...`);
      const response = await fetch(`${API_BASE_URL}/admin/team?include_inactive=true`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const members = await response.json();
        if (members.length === 0) {
          console.log('✅ No team members found - all deleted\n');
          break;
        }
        
        console.log(`  Found ${members.length} team members to delete:`);
        for (const member of members) {
          try {
            const deleteResponse = await fetch(`${API_BASE_URL}/admin/team/${member.id}`, {
              method: 'DELETE',
              headers: { 'Authorization': `Bearer ${token}` }
            });
            
            if (deleteResponse.ok) {
              console.log(`     Deleted: ${member.name} (${member.email || 'no email'})`);
            } else {
              console.log(`     Failed to delete: ${member.name}`);
            }
          } catch (e) {
            console.log(`     Error deleting ${member.name}: ${e.message}`);
          }
        }
      }
      
      // Wait before next attempt
      if (attempt < 5) {
        console.log('  ⏳ Waiting 2 seconds before next attempt...');
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    } catch (error) {
      console.log(`  ⚠️ Error on attempt ${attempt}:`, error.message);
    }
  }
  
  // Delete milestones
  try {
    console.log('Deleting milestones...');
    const response = await fetch(`${API_BASE_URL}/admin/milestones`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (response.ok) {
      const milestones = await response.json();
      console.log(`  Found ${milestones.length} milestones to delete:`);
      
      for (const milestone of milestones) {
        try {
          const deleteResponse = await fetch(`${API_BASE_URL}/admin/milestones/${milestone.id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
          });
          
          if (deleteResponse.ok) {
            console.log(`     Deleted: ${milestone.title.substring(0, 50)}...`);
          }
        } catch (e) {
          console.log(`     Error deleting milestone`);
        }
      }
    }
    console.log('✅ Milestone deletion complete\n');
  } catch (error) {
    console.log('   Error during milestone deletion:', error.message);
  }
}

async function insertAllTeamMembers(token) {
  console.log(' INSERTING ALL 5 TEAM MEMBERS...\n');
  let successCount = 0;
  
  for (const member of exactTeamMembers) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/team`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(member)
      });
      
      if (response.ok) {
        console.log(`  ✅ SUCCESS: ${member.name} (${member.position})`);
        successCount++;
      } else {
        const error = await response.json();
        console.error(`  ❌ FAILED: ${member.name} - ${error.detail || 'Unknown error'}`);
        
        // If email exists, try to find and delete the existing one
        if (error.detail && error.detail.includes('Email already exists')) {
          console.log(`    🔍 Searching for existing member with email: ${member.email}`);
          try {
            const searchResponse = await fetch(`${API_BASE_URL}/admin/team?include_inactive=true`, {
              headers: { 'Authorization': `Bearer ${token}` }
            });
            
            if (searchResponse.ok) {
              const allMembers = await searchResponse.json();
              const existing = allMembers.find(m => m.email === member.email || m.name === member.name);
              
              if (existing) {
                console.log(`    🗑️ Found existing: ${existing.name}, deleting...`);
                const deleteResponse = await fetch(`${API_BASE_URL}/admin/team/${existing.id}`, {
                  method: 'DELETE',
                  headers: { 'Authorization': `Bearer ${token}` }
                });
                
                if (deleteResponse.ok) {
                  console.log(`    ✅ Deleted existing member`);
                  
                  // Try to insert again
                  console.log(`    🔄 Retrying insertion...`);
                  await new Promise(resolve => setTimeout(resolve, 1000));
                  
                  const retryResponse = await fetch(`${API_BASE_URL}/admin/team`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(member)
                  });
                  
                  if (retryResponse.ok) {
                    console.log(`    ✅ RETRY SUCCESS: ${member.name}`);
                    successCount++;
                  } else {
                    console.log(`    ❌ RETRY FAILED: ${member.name}`);
                  }
                }
              }
            }
          } catch (searchError) {
            console.log(`    ⚠️ Error during search/delete: ${searchError.message}`);
          }
        }
      }
    } catch (error) {
      console.error(`  ❌ ERROR: ${member.name} - ${error.message}`);
    }
  }
  
  console.log(`\n📊 TEAM MEMBERS FINAL: ${successCount}/${exactTeamMembers.length} inserted successfully\n`);
  return successCount;
}

async function insertAllMilestones(token) {
  console.log('📅 INSERTING ALL 6 JOURNEY MILESTONES...\n');
  let successCount = 0;
  
  for (const milestone of exactJourneyMilestones) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/milestones`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(milestone)
      });
      
      if (response.ok) {
        console.log(`  ✅ ${milestone.year}: ${milestone.title.substring(0, 60)}...`);
        successCount++;
      } else {
        const error = await response.json();
        console.error(`  ❌ ${milestone.title.substring(0, 40)}...: ${error.detail || 'Unknown error'}`);
      }
    } catch (error) {
      console.error(`  ❌ Error inserting milestone: ${error.message}`);
    }
  }
  
  console.log(`\n📊 MILESTONES FINAL: ${successCount}/${exactJourneyMilestones.length} inserted successfully\n`);
  return successCount;
}

async function runFinalForceCleanMigration() {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('🔥 FINAL FORCE CLEAN MIGRATION - BioLabMate');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('This will FORCE DELETE and RE-INSERT all data to fix conflicts');
  console.log('═══════════════════════════════════════════════════════════\n');
  
  try {
    // Step 1: Login
    const token = await loginAdmin();
    
    // Step 2: Force delete everything with multiple attempts
    await deleteAllExistingData(token);
    
    console.log('⏳ Waiting 3 seconds before insertion...\n');
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Step 3: Insert all team members (with retry logic)
    const teamCount = await insertAllTeamMembers(token);
    
    console.log('⏳ Waiting 2 seconds before milestone insertion...\n');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Step 4: Insert all milestones
    const milestoneCount = await insertAllMilestones(token);
    
    // Final summary
    console.log('═══════════════════════════════════════════════════════════');
    if (teamCount === 5 && milestoneCount === 6) {
      console.log('🎉 PERFECT SUCCESS! ALL DATA MIGRATED!');
      console.log('═══════════════════════════════════════════════════════════');
      console.log('✅ 5/5 Team Members Inserted:');
      console.log('   1. Dr.Sarika Kumari - CEO/Co-Founder');
      console.log('   2. Sanjay Dubey - CTO/Co-Founder');
      console.log('   3. Dr. Gordon Slade - Aquaculture Advisor');
      console.log('   4. Anil Manyam - Software Developer (Intern)');
      console.log('   5. Vaibhav Thummar - Software Engineer(Intern)');
      console.log('');
      console.log('✅ 6/6 Journey Milestones Inserted:');
      console.log('   2023: Ocean Climate Challenge, Foresight Canada');
      console.log('   2024: econext Award, RBC Spring Program');
      console.log('   2025: Blue BioValue, Parliament Committee');
      console.log('');
      console.log('🔍 VERIFICATION:');
      console.log('   • Website: http://localhost:8080');
      console.log('   • Team section should show 5 members');
      console.log('   • Journey section should show 6 milestones by year');
      console.log('   • Admin panel: http://localhost:8080/admin');
      console.log('');
    } else {
      console.log('⚠️ PARTIAL SUCCESS:');
      console.log(`   Team Members: ${teamCount}/5`);
      console.log(`   Milestones: ${milestoneCount}/6`);
      console.log('');
      console.log('📞 If still issues, run this script again - it has retry logic!');
      console.log('');
    }
    console.log('═══════════════════════════════════════════════════════════');
    
  } catch (error) {
    console.error('\n💥 MIGRATION FAILED:', error.message);
    console.error('\n🔧 TROUBLESHOOTING:');
    console.error('   1. Ensure backend is running: python app.py');
    console.error('   2. Check MongoDB connection in backend logs');
    console.error('   3. Try running this script again\n');
  }
}

// Run the migration
runFinalForceCleanMigration();